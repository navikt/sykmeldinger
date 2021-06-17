export const sykmeldingApen = {
    id: 'APEN',
    mottattTidspunkt: '2020-01-10',
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
            tom: '2020-02-15',
            behandlingsdager: 2,
            type: 'BEHANDLINGSDAGER',
            reisetilskudd: false,
        },
        {
            fom: '2020-02-10',
            tom: '2020-02-15',
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    arsak: ['ANNET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    beskrivelse: 'Dette er en beskrivelse av den medisinske årsaken.',
                },
                arbeidsrelatertArsak: {
                    arsak: ['ANNET'],
                    beskrivelse: 'Dette er en beskrivelse av den arbeidsrelaterte årsaken',
                },
            },
            reisetilskudd: false,
        },
        {
            fom: '2020-02-16',
            tom: '2020-02-20',
            type: 'GRADERT',
            gradert: {
                grad: 20,
                reisetilskudd: false,
            },
            reisetilskudd: false,
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
            grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE'],
        },
    },
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Du må ta det rolig på jobben',
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
};
