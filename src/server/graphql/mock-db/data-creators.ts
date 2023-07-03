import { v4 } from 'uuid'

import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Merknad } from '../../api-models/sykmelding/Merknad'
import { Arbeidsgiver } from '../../api-models/Arbeidsgiver'
import {
    AnnenFraverGrunn,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
    RegelStatus,
    StatusEvent,
} from '../resolver-types.generated'
import { AktivitetIkkeMuligPeriode, Periode } from '../../api-models/sykmelding/Periode'
import { dateAdd } from '../../../utils/dateUtils'
import { RuleHit } from '../../api-models/sykmelding/Behandlingsutfall'

export class SykmeldingBuilder {
    private readonly mottatt: string = '2020-02-01'
    private readonly _sykmelding: Sykmelding = {
        id: 'sykmelding-id',
        mottattTidspunkt: this.mottatt,
        behandlingsutfall: {
            status: RegelStatus.OK,
            ruleHits: [],
        },
        arbeidsgiver: {
            navn: 'Navn Navnesen',
        },
        sykmeldingsperioder: [],
        sykmeldingStatus: {
            timestamp: this.mottatt,
            statusEvent: StatusEvent.SENDT,
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Eksempeldiagnose 1',
            },
            biDiagnoser: [
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Eksempeldiagnose 2',
                },
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-59',
                    tekst: 'Eksempeldiagnose 3',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2018-10-18',
            annenFraversArsak: {
                beskrivelse: 'Annen fravær årsak eksempelbeskrivelse',
                grunn: [AnnenFraverGrunn.NODVENDIG_KONTROLLUNDENRSOKELSE],
            },
        },
        utdypendeOpplysninger: {
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
        },
        pasient: {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
        kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
        behandletTidspunkt: this.mottatt,
        behandler: {
            fornavn: 'Behandler',
            mellomnavn: null,
            etternavn: 'Behandlersen',
            adresse: {
                gate: 'Gateveien 4',
                postnummer: 1001,
                kommune: 'Oslo',
                postboks: '1212 Gateveien',
                land: 'NO',
            },
            tlf: '900 00 000',
        },
        egenmeldt: false,
        papirsykmelding: false,
        andreTiltak: null,
        meldingTilArbeidsgiver: null,
        meldingTilNAV: null,
        merknader: null,
        prognose: null,
        tiltakArbeidsplassen: null,
        tiltakNAV: null,
        utenlandskSykmelding: null,
        rulesetVersion: 3,
    }

    constructor(mottatt: string | { offset: number } = '2020-01-01', id: string = v4()) {
        this._sykmelding.id = id
        if (typeof mottatt === 'string') {
            this.mottatt = mottatt
            this._sykmelding.mottattTidspunkt = mottatt
        } else {
            const mottattDate = dateAdd(new Date(), { days: mottatt.offset })
            this.mottatt = mottattDate
            this._sykmelding.mottattTidspunkt = mottattDate
        }
    }

    periode(periode: BuilderPeriode): SykmeldingBuilder {
        this._sykmelding.sykmeldingsperioder.push(builderPeriodeToPeriod(periode))

        return this
    }

    relativePeriode(periode: BuilderPeriodeVariations, time: { offset: number; days: number }): SykmeldingBuilder {
        const periodeWithDates: BuilderPeriode = {
            ...periode,
            fom: dateAdd(this.mottatt, { days: time.offset }),
            tom: dateAdd(this.mottatt, { days: time.offset + time.days }),
        }

        this.periode(periodeWithDates)

        return this
    }

    enkelPeriode(relative: { offset: number; days: number } = { offset: 0, days: 7 }): SykmeldingBuilder {
        const periode: BuilderPeriodeVariations = {
            type: Periodetype.AKTIVITET_IKKE_MULIG,
            medisinskArsak: {
                arsak: [MedisinskArsakType.AKTIVITET_FORHINDRER_BEDRING],
                beskrivelse: 'Dette er en beskrivelse av medisinsk årsak',
            },
            arbeidsrelatertArsak: {
                arsak: [ArbeidsrelatertArsakType.MANGLENDE_TILRETTELEGGING],
                beskrivelse: 'Dette er en beskrivelse av arbeidsrelatert årsak',
            },
        }

        return this.relativePeriode(periode, relative)
    }

    status(status: StatusEvent, timestamp = this.mottatt): SykmeldingBuilder {
        this._sykmelding.sykmeldingStatus.statusEvent = status
        this._sykmelding.sykmeldingStatus.timestamp = timestamp

        if (status === StatusEvent.SENDT) {
            this._sykmelding.sykmeldingStatus.arbeidsgiver = {
                orgNavn: defaultArbeidsgivere[0].navn,
                orgnummer: defaultArbeidsgivere[0].orgnummer,
            }
        }

        return this
    }

    merknader(merknader: Merknad[]): SykmeldingBuilder {
        this._sykmelding.merknader = merknader

        return this
    }

    papir(): SykmeldingBuilder {
        this._sykmelding.papirsykmelding = true

        return this
    }

    utenlandsk(): SykmeldingBuilder {
        this._sykmelding.utenlandskSykmelding = {
            land: 'SE',
        }

        return this
    }

    egenmeldt(): SykmeldingBuilder {
        this._sykmelding.egenmeldt = true

        return this
    }

    behandlingsutfall(status: RegelStatus.INVALID, ruleHits: RuleHit[]): SykmeldingBuilder {
        this._sykmelding.behandlingsutfall = {
            status,
            ruleHits,
        }

        return this
    }

    build(): Sykmelding {
        if (this._sykmelding.sykmeldingsperioder.length === 0) {
            throw new Error('Sykmelding må ha minst en periode')
        }

        return this._sykmelding
    }
}

type BuilderPeriode = { fom: string; tom: string } & BuilderPeriodeVariations
type BuilderPeriodeVariations =
    | {
          type: Periodetype.AKTIVITET_IKKE_MULIG
          medisinskArsak: AktivitetIkkeMuligPeriode['medisinskArsak'] | null
          arbeidsrelatertArsak: AktivitetIkkeMuligPeriode['arbeidsrelatertArsak'] | null
      }
    | {
          type: Periodetype.GRADERT
          gradert: {
              grad: number
              reisetilskudd: boolean
          }
      }
    | {
          type: Periodetype.AVVENTENDE
          tilrettelegging: string
      }
    | {
          type: Periodetype.BEHANDLINGSDAGER
          behandlingsdager: number
      }
    | {
          type: Periodetype.REISETILSKUDD
      }

function builderPeriodeToPeriod(periode: BuilderPeriode): Periode {
    const common = {
        fom: periode.fom,
        tom: periode.tom,
        aktivitetIkkeMulig: null,
        gradert: null,
        behandlingsdager: null,
        innspillTilArbeidsgiver: null,
        reisetilskudd: false,
    }

    switch (periode.type) {
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return {
                ...common,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: periode.medisinskArsak,
                    arbeidsrelatertArsak: periode.arbeidsrelatertArsak,
                },
            }
        case Periodetype.GRADERT:
            return {
                ...common,
                type: Periodetype.GRADERT,
                gradert: periode.gradert,
            }
        case Periodetype.BEHANDLINGSDAGER:
            return {
                ...common,
                type: Periodetype.BEHANDLINGSDAGER,
                behandlingsdager: periode.behandlingsdager,
            }
        case Periodetype.AVVENTENDE:
            return {
                ...common,
                type: Periodetype.AVVENTENDE,
                innspillTilArbeidsgiver: periode.tilrettelegging,
            }
        case Periodetype.REISETILSKUDD:
            return {
                ...common,
                type: Periodetype.REISETILSKUDD,
            }
    }
}

export const defaultArbeidsgivere: readonly Arbeidsgiver[] = [
    {
        naermesteLeder: {
            navn: 'Station Officer Steele',
        },
        navn: 'PONTYPANDY FIRE SERVICE',
        orgnummer: '110110110',
        aktivtArbeidsforhold: true,
    },
    {
        naermesteLeder: {
            navn: 'Brannkonstabel Sam',
        },
        navn: 'ANDEBY BRANNSTATION',
        orgnummer: '110110112',
        aktivtArbeidsforhold: false,
    },
    {
        naermesteLeder: {
            navn: 'Steve Cook',
        },
        navn: 'Nottinghamshire Fire and Rescue Service',
        orgnummer: '110110113',
        aktivtArbeidsforhold: true,
    },
]
