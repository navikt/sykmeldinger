// TODO: Opprette ulike sykmeldingMocks for de forskjellige sykmeldingtypene.

export const nySykmeldingMock = {
    status: 'ny',
    sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
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
                    system: '3.16.578.1.12.4.1.1.7170',
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
                grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
            },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Selskap AS',
            yrkesbetegnelse: 'Kul jobb',
            stillingsprosent: 100,
        },
        perioder: [
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2018-11-21',
                vurderingsdato: '2018-10-30',
            },
            erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Er pasient frisk?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.3.2': {
                    sporsmal: 'Er pasient klar for å jobbe?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
        tiltakArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2018-10-04',
            begrunnelseIkkeKontakt:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
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
        avsenderSystem: {
            navn: 'NAV Test generator',
            versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16.861476',
        navnFastlege: 'Doktor Legesen',
    },
};

export const bekreftetSykmeldingMock = {
    status: 'bekreftet',
    sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
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
                    system: '3.16.578.1.12.4.1.1.7170',
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
                grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
            },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Selskap AS',
            yrkesbetegnelse: 'Kul jobb',
            stillingsprosent: 100,
        },
        perioder: [
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2018-11-21',
                vurderingsdato: '2018-10-30',
            },
            erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Er pasient frisk?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.3.2': {
                    sporsmal: 'Er pasient klar for å jobbe?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
        tiltakArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2018-10-04',
            begrunnelseIkkeKontakt:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
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
        avsenderSystem: {
            navn: 'NAV Test generator',
            versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16.861476',
        navnFastlege: 'Doktor Legesen',
    },
};

export const avbruttSykmeldingMock = {
    status: 'avbrutt',
    sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
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
                    system: '3.16.578.1.12.4.1.1.7170',
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
                grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
            },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Selskap AS',
            yrkesbetegnelse: 'Kul jobb',
            stillingsprosent: 100,
        },
        perioder: [
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2018-11-21',
                vurderingsdato: '2018-10-30',
            },
            erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Er pasient frisk?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.3.2': {
                    sporsmal: 'Er pasient klar for å jobbe?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
        tiltakArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2018-10-04',
            begrunnelseIkkeKontakt:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
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
        avsenderSystem: {
            navn: 'NAV Test generator',
            versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16.861476',
        navnFastlege: 'Doktor Legesen',
    },
};

export const sendtSykmeldingMock = {
    status: 'sendt',
    sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
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
                    system: '3.16.578.1.12.4.1.1.7170',
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
                grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
            },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Selskap AS',
            yrkesbetegnelse: 'Kul jobb',
            stillingsprosent: 100,
        },
        perioder: [
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2018-11-21',
                vurderingsdato: '2018-10-30',
            },
            erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Er pasient frisk?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.3.2': {
                    sporsmal: 'Er pasient klar for å jobbe?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
        tiltakArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2018-10-04',
            begrunnelseIkkeKontakt:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
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
        avsenderSystem: {
            navn: 'NAV Test generator',
            versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16.861476',
        navnFastlege: 'Doktor Legesen',
    },
};

export const avvistSykmeldingMock = {
    status: 'avvist',
    sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
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
                    system: '3.16.578.1.12.4.1.1.7170',
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
                grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
            },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
            harArbeidsgiver: 'EN_ARBEIDSGIVER',
            navn: 'Selskap AS',
            yrkesbetegnelse: 'Kul jobb',
            stillingsprosent: 100,
        },
        perioder: [
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
            {
                fom: '2018-10-18',
                tom: '2018-11-12',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'dette er en beskrivelse',
                        arsak: ['ANNET'],
                    },
                },
                avventendeInnspillTilArbeidsgiver: null,
                behandlingsdager: null,
                gradert: {
                    reisetilskudd: true,
                    grad: 56,
                },
                reisetilskudd: false,
            },
        ],
        prognose: {
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2018-11-21',
                vurderingsdato: '2018-10-30',
            },
            erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
            '6.3': {
                '6.3.1': {
                    sporsmal: 'Er pasient frisk?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.3.2': {
                    sporsmal: 'Er pasient klar for å jobbe?',
                    svar:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
        tiltakArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
            bistandUmiddelbart: true,
            beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
            kontaktDato: '2018-10-04',
            begrunnelseIkkeKontakt:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
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
        avsenderSystem: {
            navn: 'NAV Test generator',
            versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16.861476',
        navnFastlege: 'Doktor Legesen',
    },
};

export const sykmeldingerMock = [
    {
        receivedSykmelding: {
            sykmelding: {
                id: 'detteerensykmeldingid',
                msgId: '123124334',
                pasientAktoerId: '41234123',
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
                            system: '3.16.578.1.12.4.1.1.7170',
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
                        grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
                    },
                },
                skjermesForPasient: true,
                arbeidsgiver: {
                    harArbeidsgiver: 'EN_ARBEIDSGIVER',
                    navn: 'Selskap AS',
                    yrkesbetegnelse: 'Kul jobb',
                    stillingsprosent: 100,
                },
                perioder: [
                    {
                        fom: '2018-10-18',
                        tom: '2018-11-12',
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                beskrivelse: 'dette er en beskrivelse',
                                arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                            },
                            arbeidsrelatertArsak: {
                                beskrivelse: 'dette er en beskrivelse',
                                arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                            },
                        },
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: {
                            reisetilskudd: true,
                            grad: 56,
                        },
                        reisetilskudd: false,
                    },
                    {
                        fom: '2018-10-18',
                        tom: '2018-11-12',
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                beskrivelse: 'dette er en beskrivelse',
                                arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
                            },
                            arbeidsrelatertArsak: {
                                beskrivelse: 'dette er en beskrivelse',
                                arsak: ['ANNET'],
                            },
                        },
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: {
                            reisetilskudd: true,
                            grad: 56,
                        },
                        reisetilskudd: false,
                    },
                ],
                prognose: {
                    arbeidsforEtterPeriode: false,
                    hensynArbeidsplassen:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    erIArbeid: {
                        egetArbeidPaSikt: true,
                        annetArbeidPaSikt: true,
                        arbeidFOM: '2018-11-21',
                        vurderingsdato: '2018-10-30',
                    },
                    erIkkeIArbeid: null,
                },
                utdypendeOpplysninger: {
                    '6.3': {
                        '6.3.1': {
                            sporsmal: 'Er pasient frisk?',
                            svar:
                                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                        '6.3.2': {
                            sporsmal: 'Er pasient klar for å jobbe?',
                            svar:
                                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                    },
                },
                tiltakArbeidsplassen:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                tiltakNAV:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                andreTiltak:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                meldingTilNAV: {
                    bistandUmiddelbart: true,
                    beskrivBistand: 'trenger hjelp',
                },
                meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
                kontaktMedPasient: {
                    kontaktDato: '2018-10-04',
                    begrunnelseIkkeKontakt:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                },
                behandletTidspunkt: '2018-10-14T14:52:35',
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
                avsenderSystem: {
                    navn: 'NAV Test generator',
                    versjon: '1.0',
                },
                syketilfelleStartDato: '2018-10-10',
                signaturDato: '2019-04-29T08:34:16.861476',
                navnFastlege: 'Doktor Legesen',
            },
        },
    },
    {
        receivedSykmelding: {
            sykmelding: {
                id: 'detteerensykmeldingid',
                msgId: '123124334',
                pasientAktoerId: '41234123',
                medisinskVurdering: {
                    hovedDiagnose: {
                        system: '2.16.578.1.12.4.1.1.7170',
                        kode: 'K24',
                        tekst: 'Sykdom0',
                    },
                    biDiagnoser: [
                        {
                            system: '2.16.578.1.12.4.1.1.7170',
                            kode: '-57',
                            tekst: 'Sykdom0',
                        },
                        {
                            system: '3.16.578.1.12.4.1.1.7170',
                            kode: '-59',
                            tekst: 'Sykdom0',
                        },
                    ],
                    svangerskap: true,
                    yrkesskade: false,
                    yrkesskadeDato: null,
                    annenFraversArsak: {
                        beskrivelse:
                            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                        grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE'],
                    },
                },
                skjermesForPasient: false,
                arbeidsgiver: {
                    harArbeidsgiver: 'EN_ARBEIDSGIVER',
                    navn: 'Selskap AS',
                    yrkesbetegnelse: 'TODO',
                    stillingsprosent: 100,
                },
                perioder: [
                    {
                        fom: '2018-10-18',
                        tom: '2018-11-12',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: {
                            reisetilskudd: true,
                            grad: 56,
                        },
                        reisetilskudd: false,
                    },
                ],
                prognose: {
                    arbeidsforEtterPeriode: false,
                    hensynArbeidsplassen:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    erIArbeid: {
                        egetArbeidPaSikt: false,
                        annetArbeidPaSikt: true,
                        arbeidFOM: '2018-11-21',
                        vurderingsdato: '2018-10-30',
                    },
                    erIkkeIArbeid: null,
                },
                utdypendeOpplysninger: {
                    '6.3': {
                        '6.3.1': {
                            sporsmal: 'Er pasient frisk?',
                            svar:
                                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                        '6.3.2': {
                            sporsmal: 'Er pasient klar for å jobbe?',
                            svar:
                                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                    },
                },
                tiltakArbeidsplassen:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                tiltakNAV:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                andreTiltak:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                meldingTilNAV: {
                    bistandUmiddelbart: false,
                    beskrivBistand: null,
                },
                meldingTilArbeidsgiver: null,
                kontaktMedPasient: {
                    kontaktDato: '2018-10-04',
                    begrunnelseIkkeKontakt:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                },
                behandletTidspunkt: '2018-10-14T14:52:35',
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
                avsenderSystem: {
                    navn: 'NAV Test generator',
                    versjon: '1.0',
                },
                syketilfelleStartDato: '2018-10-10',
                signaturDato: '2019-04-29T08:34:16.861476',
                navnFastlege: 'Doktor Legesen',
            },
        },
    },
];
