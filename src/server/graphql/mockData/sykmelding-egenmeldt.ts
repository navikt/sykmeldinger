import { Sykmelding } from '../../api-models/sykmelding/Sykmelding';
import { AnnenFraverGrunn, Periodetype, RegelStatus, StatusEvent } from '../resolver-types.generated';

export const sykmeldingEgenmeldt: Sykmelding = {
    id: 'EGENMELDT',
    mottattTidspunkt: '2020-06-01',
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
            fom: '2020-02-10',
            tom: '2020-02-15',
            behandlingsdager: 2,
            type: Periodetype.Behandlingsdager,
            reisetilskudd: false,
            gradert: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.Bekreftet,
        sporsmalOgSvarListe: [],
        arbeidsgiver: null,
    },
    medisinskVurdering: {
        hovedDiagnose: {
            system: '2.16.578.1.12.4.1.1.7170',
            kode: 'K24',
            tekst: 'COVID-19',
        },
        biDiagnoser: [],
        svangerskap: true,
        yrkesskade: true,
        yrkesskadeDato: '2018-10-18',
        annenFraversArsak: {
            beskrivelse:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            grunn: [AnnenFraverGrunn.Abort],
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
    egenmeldt: true,
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
