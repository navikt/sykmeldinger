import { Sykmelding } from '../../api-models/sykmelding/Sykmelding';
import { dateAdd } from '../../../utils/dateUtils';
import {
    AnnenFraverGrunn,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
    RegelStatus,
    StatusEvent,
} from '../resolver-types.generated';

export function sykmeldingSendt(mottatt = '2020-02-01'): Sykmelding {
    return {
        id: 'SENDT',
        mottattTidspunkt: mottatt,
        behandlingsutfall: {
            status: RegelStatus.Ok,
            ruleHits: [],
        },
        arbeidsgiver: {
            navn: 'Navn Navnesen',
            stillingsprosent: 100,
        },
        sykmeldingsperioder: [
            {
                fom: dateAdd(mottatt, { days: 10 }),
                tom: dateAdd(mottatt, { days: 11 }),
                behandlingsdager: 2,
                type: Periodetype.Behandlingsdager,
                reisetilskudd: false,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: null,
            },
            {
                fom: dateAdd(mottatt, { days: 13 }),
                tom: dateAdd(mottatt, { days: 15 }),
                type: Periodetype.AktivitetIkkeMulig,
                reisetilskudd: false,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'Han er veldig syk',
                        arsak: [MedisinskArsakType.TilstandHindrerAktivitet],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'Kan ikke jobbe fordi han ikke har hev-/senk-bord',
                        arsak: [ArbeidsrelatertArsakType.ManglendeTilrettelegging],
                    },
                },
                gradert: null,
                innspillTilArbeidsgiver: null,
                behandlingsdager: null,
            },
        ],
        sykmeldingStatus: {
            timestamp: mottatt,
            statusEvent: StatusEvent.Sendt,
            arbeidsgiver: {
                orgnummer: '123456',
                orgNavn: 'Posten AS',
                juridiskOrgnummer: null,
            },
            sporsmalOgSvarListe: [],
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Vondt i magen',
            },
            biDiagnoser: [
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Vondt i magen',
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
                grunn: [AnnenFraverGrunn.NodvendigKontrollundenrsokelse],
            },
        },
        skjermesForPasient: false,
        utdypendeOpplysninger: {
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
        },
        kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
        behandletTidspunkt: mottatt,
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
        andreTiltak: null,
        legekontorOrgnummer: null,
        meldingTilArbeidsgiver: null,
        meldingTilNAV: null,
        merknader: null,
        prognose: null,
        tiltakArbeidsplassen: null,
        tiltakNAV: null,
    };
}
