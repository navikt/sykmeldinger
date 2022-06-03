import { formatISO, sub } from 'date-fns';

import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import { RegelStatus } from '../../../models/Sykmelding/Behandlingsutfall';
import { ArbeidsrelatertArsakType, MedisinskArsakType, Periodetype } from '../../../models/Sykmelding/Periode';
import { StatusEvent } from '../../../models/Sykmelding/SykmeldingStatus';
import { AnnenFraverGrunn } from '../../../models/Sykmelding/MedisinskVurdering';
import { dateAdd } from '../../dateUtils';

export function sykmeldingApen(mottatt: string = formatISO(sub(new Date(), { days: 2 })), id = 'APEN'): Sykmelding {
    return {
        id,
        mottattTidspunkt: mottatt,
        behandlingsutfall: {
            status: RegelStatus.OK,
            ruleHits: [],
        },
        arbeidsgiver: {
            navn: 'Navn Navnesen',
            stillingsprosent: 100,
        },
        merknader: null,
        legekontorOrgnummer: null,
        meldingTilArbeidsgiver: null,
        sykmeldingsperioder: [
            {
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                behandlingsdager: 2,
                type: Periodetype.BEHANDLINGSDAGER,
                reisetilskudd: false,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: null,
            },
            {
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                behandlingsdager: null,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        arsak: [MedisinskArsakType.ANNET, MedisinskArsakType.AKTIVITET_FORVERRER_TILSTAND],
                        beskrivelse: 'Dette er en beskrivelse av den medisinske årsaken.',
                    },
                    arbeidsrelatertArsak: {
                        arsak: [ArbeidsrelatertArsakType.ANNET],
                        beskrivelse: 'Dette er en beskrivelse av den arbeidsrelaterte årsaken',
                    },
                },
                reisetilskudd: false,
            },
            {
                fom: dateAdd(mottatt, { days: 6 }),
                tom: dateAdd(mottatt, { days: 11 }),
                type: Periodetype.GRADERT,
                gradert: {
                    grad: 20,
                    reisetilskudd: false,
                },
                reisetilskudd: false,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
                innspillTilArbeidsgiver: null,
            },
        ],
        sykmeldingStatus: {
            timestamp: mottatt,
            statusEvent: StatusEvent.APEN,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Rar sykdom',
            },
            biDiagnoser: [
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Rar sykdom',
                },
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-59',
                    tekst: 'Sykdom0',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2018-10-18',
            annenFraversArsak: {
                beskrivelse:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                grunn: [AnnenFraverGrunn.NODVENDIG_KONTROLLUNDENRSOKELSE],
            },
        },
        prognose: {
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'Du må ta det rolig på jobben',
            erIArbeid: null,
            erIkkeIArbeid: null,
        },
        skjermesForPasient: false,
        utdypendeOpplysninger: {
            '6.1': {
                '6.1.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
                '6.2.2': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
        },
        tiltakArbeidsplassen: 'Tiltak på arbeidsplassen',
        tiltakNAV: 'Tiltak NAV',
        andreTiltak: 'Du må gjøre andre tiltak',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'Trenger hjelp med penger',
        },
        kontaktMedPasient: {
            kontaktDato: '2020-04-01',
            begrunnelseIkkeKontakt: 'Han var kjempesyk',
        },
        behandletTidspunkt: dateAdd(mottatt, { days: 10 }),
        behandler: {
            fornavn: 'Fornavn',
            mellomnavn: null,
            etternavn: 'Etternavn',
            adresse: {
                gate: 'Gateveien 4',
                postnummer: 1001,
                kommune: 'Oslo',
                postboks: '1212 Gateveien',
                land: 'NO',
            },
            tlf: '900 00 000',
        },
        syketilfelleStartDato: '2018-10-10',
        navnFastlege: 'Doktor Legesen',
        egenmeldt: false,
        papirsykmelding: false,
        harRedusertArbeidsgiverperiode: false,
        pasient: {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
    };
}
