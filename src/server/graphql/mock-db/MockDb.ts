import * as R from 'remeda'

import { SykmeldingChangeStatus } from 'queries'

import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Brukerinformasjon } from '../../api-models/Brukerinformasjon'
import { ErUtenforVentetid } from '../../api-models/ErUtenforVentetid'
import {
    ArbeidssituasjonType,
    Merknadtype,
    MinimalSykmelding,
    SendSykmeldingValues,
    ShortName,
    StatusEvent,
    SykmeldingCategory,
} from '../resolver-types.generated'
import { Sporsmal, Svartype } from '../../api-models/sykmelding/SykmeldingStatus'
import { sporsmal } from '../../../utils/sporsmal'
import { toDateString } from '../../../utils/dateUtils'
import { Arbeidsgiver } from '../../api-models/Arbeidsgiver'

import { defaultArbeidsgivere } from './data-creators'

class MockDb {
    private readonly _sykmeldinger: Sykmelding[]
    private _strengtFortroligAdresse = false
    private _antallArbeidsgivere = 1

    constructor(scenario: { sykmeldinger: Sykmelding[] }) {
        this._sykmeldinger = scenario.sykmeldinger
    }

    sykmeldinger(): Sykmelding[] {
        return this._sykmeldinger
    }

    brukerinformasjon(): Brukerinformasjon {
        return {
            strengtFortroligAdresse: this._strengtFortroligAdresse,
            arbeidsgivere: this.arbeidsgivere(),
        }
    }

    sykeldingErUtenforVentetid(): ErUtenforVentetid {
        return {
            erUtenforVentetid: false,
            oppfolgingsdato: '2021-04-10',
        }
    }

    sykmelding(id: string): Sykmelding {
        const sykmelding = this._sykmeldinger.find((it) => it.id === id)
        if (!sykmelding) {
            throw new Error(`Unable to find sykmelding by sykmeldingId: ${id}`)
        }
        return sykmelding
    }

    minimalSykmeldinger(category: SykmeldingCategory): MinimalSykmelding[] {
        return this.sykmeldinger().filter(byCategory(category)).map(toMinimalSykmelding)
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

        const sporsmalOgSvarListe: Sporsmal[] = R.compact([
            {
                shortName: ShortName.ARBEIDSSITUASJON,
                svar: {
                    svarType: Svartype.ARBEIDSSITUASJON,
                    svar: values.arbeidssituasjon as ArbeidssituasjonType,
                },
                tekst: 'Hva er din arbeidssituasjon?',
            },
            values.egenmeldingsdager != null && values.egenmeldingsdager.length > 0
                ? {
                      shortName: ShortName.EGENMELDINGSDAGER,
                      tekst: 'Brukte du egenmeldingsdager?',
                      svar: {
                          svarType: Svartype.DAGER,
                          svar: values.egenmeldingsdager as string[],
                      },
                  }
                : null,
        ])

        if (values.arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER) {
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

    toggleStrengtFortroligAdresse(): void {
        this._strengtFortroligAdresse = !this._strengtFortroligAdresse
    }

    setAntallArbeidsgivere(antall: number): void {
        this._antallArbeidsgivere = antall
    }

    private arbeidsgivere(): Arbeidsgiver[] {
        return defaultArbeidsgivere.slice(0, this._antallArbeidsgivere)
    }
}

function byCategory(category: SykmeldingCategory) {
    return (sykmelding: Sykmelding): boolean => {
        switch (category) {
            case SykmeldingCategory.UNSENT:
                return sykmelding.sykmeldingStatus.statusEvent === StatusEvent.APEN
            case SykmeldingCategory.PROCESSING:
                return sykmelding.sykmeldingStatus.statusEvent === StatusEvent.SENDT && isUnderBehandling(sykmelding)
            case SykmeldingCategory.OLDER:
                return sykmelding.sykmeldingStatus.statusEvent !== StatusEvent.APEN && !isUnderBehandling(sykmelding)
        }
    }
}

function isUnderBehandling(sykmelding: Sykmelding): boolean {
    return sykmelding.merknader?.find((it) => it.type === Merknadtype.UNDER_BEHANDLING) != null
}

function toMinimalSykmelding(sykmelding: Sykmelding): MinimalSykmelding {
    return {
        __typename: 'MinimalSykmelding',
        sykmelding_id: sykmelding.id,
        event: sykmelding.sykmeldingStatus.statusEvent,
        timestamp: sykmelding.sykmeldingStatus.timestamp,
        arbeidsgiver: sykmelding.sykmeldingStatus.arbeidsgiver
            ? {
                  orgNavn: sykmelding.sykmeldingStatus.arbeidsgiver.orgNavn,
                  orgnummer: sykmelding.sykmeldingStatus.arbeidsgiver.orgnummer,
              }
            : null,
        behandlingsutfall: sykmelding.behandlingsutfall.status,
        rule_hits: sykmelding.behandlingsutfall.ruleHits,
        sykmelding: {
            utenlandskSykmelding: sykmelding.utenlandskSykmelding,
            egenmeldt: sykmelding.egenmeldt,
            papirsykmelding: sykmelding.papirsykmelding,
            sykmeldingsperioder: sykmelding.sykmeldingsperioder,
        },
    }
}

export default MockDb
