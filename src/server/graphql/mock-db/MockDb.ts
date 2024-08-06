import * as R from 'remeda'

import { SykmeldingChangeStatus } from 'queries'

import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Brukerinformasjon } from '../../api-models/Brukerinformasjon'
import { ErUtenforVentetid } from '../../api-models/ErUtenforVentetid'
import {
    ArbeidssituasjonType,
    LottOgHyre,
    SendSykmeldingValues,
    ShortName,
    StatusEvent,
} from '../resolver-types.generated'
import { BrukerSvar, Sporsmal, Svartype } from '../../api-models/sykmelding/SykmeldingStatus'
import { sporsmal } from '../../../utils/sporsmal'
import { toDateString } from '../../../utils/dateUtils'
import { Arbeidsgiver } from '../../api-models/Arbeidsgiver'
import { mapSendSykmeldingValuesToV3Api } from '../../sendSykmeldingMapping'
import { TidligereArbeidsgivere } from '../../api-models/TidligereArbeidsgiver'

import { defaultArbeidsgivere } from './data-creators'

class MockDb {
    private readonly _sykmeldinger: Sykmelding[]
    private _antallArbeidsgivere = 1
    private _erUtenforVentetid = false
    private _oppfolgingsdato: string | null = '2021-04-10'

    constructor(scenario: { sykmeldinger: Sykmelding[] }) {
        this._sykmeldinger = scenario.sykmeldinger
    }

    sykmeldinger(): Sykmelding[] {
        return this._sykmeldinger
    }

    brukerinformasjon(): Brukerinformasjon {
        return {
            arbeidsgivere: this.arbeidsgivere(),
        }
    }

    sykeldingErUtenforVentetid(): ErUtenforVentetid {
        return {
            erUtenforVentetid: this._erUtenforVentetid,
            oppfolgingsdato: this._oppfolgingsdato,
        }
    }

    tidligereArbeidsgivere(): TidligereArbeidsgivere[] {
        return this.arbeidsgivere().map((ag) => {
            return {
                orgNavn: ag.navn,
                orgnummer: ag.orgnummer,
            }
        })
    }

    sykmelding(id: string): Sykmelding {
        const sykmelding = this._sykmeldinger.find((it) => it.id === id)
        if (!sykmelding) {
            throw new Error(`Unable to find sykmelding by sykmeldingId: ${id}`)
        }

        return sykmelding
    }

    changeSykmeldingStatus(id: string, status: SykmeldingChangeStatus): Sykmelding {
        const zodStatus =
            status === SykmeldingChangeStatus.AVBRYT
                ? StatusEvent.AVBRUTT
                : status === SykmeldingChangeStatus.BEKREFT_AVVIST
                  ? StatusEvent.BEKREFTET
                  : StatusEvent.APEN

        const sykmelding = this.sykmelding(id)
        sykmelding.sykmeldingStatus.statusEvent = zodStatus
        return sykmelding
    }

    sendSykmelding(id: string, values: SendSykmeldingValues): Sykmelding {
        const sykmelding = this.sykmelding(id)

        // Validate that real mapping would have worked
        const apiValues = mapSendSykmeldingValuesToV3Api(
            values,
            sykmelding,
            this.brukerinformasjon(),
            this.sykeldingErUtenforVentetid(),
        )

        // Simulate what would happen in sykmeldinger-backend Validation step
        if (apiValues.arbeidssituasjon.svar === ArbeidssituasjonType.FISKER && apiValues.fisker != null) {
            if (apiValues.fisker.lottOgHyre.svar === 'LOTT') {
                if (apiValues.harBruktEgenmelding == null) {
                    throw new Error('Valgt fisker uten å fylle ut fiskerfeltene')
                }
            } else {
                // HYRE eller BEGGE
                if (apiValues.arbeidsgiverOrgnummer == null) {
                    throw new Error('Valgt fisker uten å fylle ut arbeidsgiverOrgnummer')
                }
            }
        }

        const sporsmalOgSvarListe: Sporsmal[] = R.filter(
            [
                {
                    tekst: 'Hvilken arbeidssituasjon gjelder sykmeldingen for?',
                    shortName: ShortName.ARBEIDSSITUASJON,
                    svar: {
                        svarType: Svartype.ARBEIDSSITUASJON as Svartype.ARBEIDSSITUASJON,
                        svar: values.arbeidssituasjon as ArbeidssituasjonType,
                    },
                },
                values.egenmeldingsdager != null && values.egenmeldingsdager.length > 0
                    ? {
                          tekst: 'Brukte du egenmeldingsdager?',
                          shortName: ShortName.EGENMELDINGSDAGER,
                          svar: {
                              svarType: Svartype.DAGER as Svartype.DAGER,
                              svar: values.egenmeldingsdager as string[],
                          },
                      }
                    : null,
            ],
            R.isTruthy,
        )

        if (
            values.arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER ||
            (values.arbeidssituasjon === ArbeidssituasjonType.FISKER &&
                (values.fisker?.lottOgHyre === LottOgHyre.HYRE || values.fisker?.lottOgHyre === LottOgHyre.BEGGE))
        ) {
            const selectedArbeidsgiver = this.arbeidsgivere().find(
                (it) => it.orgnummer === values.arbeidsgiverOrgnummer,
            )

            sykmelding.sykmeldingStatus.statusEvent = StatusEvent.SENDT
            sykmelding.sykmeldingStatus.arbeidsgiver = selectedArbeidsgiver
                ? {
                      orgnummer: selectedArbeidsgiver.orgnummer,
                      orgNavn: selectedArbeidsgiver.navn,
                  }
                : null
        } else {
            sykmelding.sykmeldingStatus.statusEvent = StatusEvent.BEKREFTET
        }

        sykmelding.sykmeldingStatus.sporsmalOgSvarListe = sporsmalOgSvarListe
        sykmelding.sykmeldingStatus.brukerSvar = apiValues as unknown as BrukerSvar

        return sykmelding
    }

    updateEgenmeldingsdager(id: string, egenmeldingsdager: string[]): Sykmelding {
        const sykmelding = this.sykmelding(id)
        const index = sykmelding.sykmeldingStatus.sporsmalOgSvarListe.findIndex(
            (it) => it.shortName === ShortName.EGENMELDINGSDAGER,
        )

        const egenmeldingssporsmal: Sporsmal = {
            tekst:
                index >= 0 ? sykmelding.sykmeldingStatus.sporsmalOgSvarListe[index].tekst : sporsmal.egenmeldingsdager,
            shortName: ShortName.EGENMELDINGSDAGER,
            svar: {
                svarType: Svartype.DAGER,
                svar: egenmeldingsdager,
            },
        }

        if (index >= 0) {
            sykmelding.sykmeldingStatus.sporsmalOgSvarListe[index] = egenmeldingssporsmal
        } else if (egenmeldingssporsmal.svar.svar.length > 0) {
            sykmelding.sykmeldingStatus.sporsmalOgSvarListe.push(egenmeldingssporsmal)
        }

        sykmelding.sykmeldingStatus.timestamp = toDateString(new Date())

        return sykmelding
    }

    setAntallArbeidsgivere(antall: number): void {
        this._antallArbeidsgivere = antall
    }

    setErUtenforVentetid(erUtenforVentetid: boolean): void {
        this._erUtenforVentetid = erUtenforVentetid
    }

    setOppfolgingsdato(oppfolgingsdato: string | ''): void {
        if (!oppfolgingsdato) {
            this._oppfolgingsdato = null
            return
        }

        this._oppfolgingsdato = oppfolgingsdato
    }

    private arbeidsgivere(): Arbeidsgiver[] {
        return defaultArbeidsgivere.slice(0, this._antallArbeidsgivere)
    }
}

export default MockDb
