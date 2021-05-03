export const sykmeldingSendt3 = {
    id: 'SENDT-3',
    mottattTidspunkt: '2020-03-06',
    behandlingsutfall: {
        status: 'OK',
        ruleHits: [],
    },
    arbeidsgiver: {
        navn: 'Navn Navnesen',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: '2020-03-10',
            tom: '2020-04-11',
            behandlingsdager: 2,
            type: 'BEHANDLINGSDAGER',
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: 'SENDT',
        arbeidsgiver: {
            orgnummer: '123456',
            orgNavn: 'Posten AS',
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
        aktoerId: '1234',
        fnr: '99999999999',
        hpr: '321',
        her: '123',
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
};
