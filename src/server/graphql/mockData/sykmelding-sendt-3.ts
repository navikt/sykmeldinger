import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import {
    AnnenFraverGrunn,
    Periodetype,
    RegelStatus,
    ShortName,
    StatusEvent,
    Svartype,
} from '../resolver-types.generated'

export const sykmeldingSendt3: Sykmelding = {
    id: 'SENDT-3',
    mottattTidspunkt: '2020-03-06',
    behandlingsutfall: {
        status: RegelStatus.OK,
        ruleHits: [],
    },
    arbeidsgiver: {
        navn: 'Navn Navnesen',
    },
    sykmeldingsperioder: [
        {
            fom: '2020-03-10',
            tom: '2020-04-11',
            behandlingsdager: 2,
            type: Periodetype.BEHANDLINGSDAGER,
            reisetilskudd: false,
            gradert: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.SENDT,
        arbeidsgiver: {
            orgnummer: '123456',
            orgNavn: 'Posten AS',
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Velg dagene du brukte egenmelding',
                shortName: ShortName.EGENMELDINGSDAGER,
                svar: {
                    svar: '["2023-04-20","2023-04-21","2023-04-22","2023-04-23","2023-04-11","2023-04-12"]',
                    svarType: Svartype.DAGER,
                },
            },
        ],
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
            grunn: [AnnenFraverGrunn.ABORT],
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
    egenmeldt: false,
    papirsykmelding: false,
    pasient: {
        fnr: '12345678901',
        fornavn: 'Ola',
        mellomnavn: null,
        etternavn: 'Nordmann',
    },
    andreTiltak: null,
    meldingTilArbeidsgiver: null,
    meldingTilNAV: null,
    merknader: null,
    prognose: null,
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    rulesetVersion: 3,
    utenlandskSykmelding: null,
}
