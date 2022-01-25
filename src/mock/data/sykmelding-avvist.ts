import dayjs from 'dayjs';

export const sykmeldingAvvist = (mottatt = dayjs().subtract(1, 'month')) => ({
    id: 'AVVIST',
    mottattTidspunkt: mottatt.format('YYYY-MM-DD'),
    behandlingsutfall: {
        status: 'INVALID',
        ruleHits: [
            {
                messageForSender: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                messageForUser: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                ruleName: 'tilbakedatering',
                ruleStatus: 'INVALID',
            },
        ],
    },
    arbeidsgiver: {
        navn: 'Navn Navnesen',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: mottatt.add(2, 'days').format('YYYY-MM-DD'),
            tom: mottatt.add(5, 'days').format('YYYY-MM-DD'),
            behandlingsdager: 2,
            reisetilskudd: false,
            type: 'BEHANDLINGSDAGER',
        },
        {
            fom: mottatt.add(6, 'days').format('YYYY-MM-DD'),
            tom: mottatt.add(10, 'days').format('YYYY-MM-DD'),
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'Han er veldig syk',
                    arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                },
                arbeidsrelatertArsak: {
                    beskrivelse: 'Kan ikke jobbe fordi han ikke har hev-/senk-bord',
                    arsak: ['MANGLENDE_TILRETTELEGGING'],
                },
            },
            reisetilskudd: false,
        },
        {
            fom: mottatt.add(11, 'days').format('YYYY-MM-DD'),
            tom: mottatt.add(15, 'days').format('YYYY-MM-DD'),
            type: 'REISETILSKUDD',
            reisetilskudd: true,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: 'APEN',
        sporsmalOgSvarListe: [],
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
            grunn: ['ABORT'],
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
    kontaktMedPasient: {},
    behandletTidspunkt: '2020-01-01',
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
});
