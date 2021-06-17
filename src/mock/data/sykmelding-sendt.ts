export const sykmeldingSendt = {
    id: 'SENDT',
    mottattTidspunkt: '2020-02-01',
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
            fom: '2020-02-10',
            tom: '2020-02-11',
            behandlingsdager: 2,
            type: 'BEHANDLINGSDAGER',
            reisetilskudd: false,
        },
        {
            fom: '2020-02-12',
            tom: '2020-02-15',
            type: 'AKTIVITET_IKKE_MULIG',
            reisetilskudd: false,
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
            grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE'],
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
};
