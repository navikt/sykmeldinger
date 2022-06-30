import { MockedResponse } from '@apollo/client/testing';
import { TypedDocumentNode } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { ResultFunction } from '@apollo/client/testing/core/mocking/mockLink';

import {
    AnnenFraverGrunn,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
    RegelStatus,
    StatusEvent,
    Sykmelding,
} from '../../fetching/graphql.generated';
import { dateAdd, dateSub } from '../dateUtils';

export function createSykmelding(overrides?: Partial<Sykmelding>, statusEvent = StatusEvent.Apen): Sykmelding {
    const mottatt = overrides?.mottattTidspunkt ?? dateSub(new Date(), { days: 2 });

    return {
        __typename: 'Sykmelding',
        id: 'test-sykmelding',
        mottattTidspunkt: mottatt,
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: mottatt,
            statusEvent,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        behandlingsutfall: {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Ok,
            ruleHits: [],
        },
        arbeidsgiver: {
            __typename: 'ArbeidsgiverSykmelding',
            navn: 'Navn Navnesen',
            stillingsprosent: 100,
        },
        merknader: null,
        legekontorOrgnummer: null,
        meldingTilArbeidsgiver: null,
        sykmeldingsperioder: [
            {
                __typename: 'Periode',
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                behandlingsdager: 2,
                type: Periodetype.Behandlingsdager,
                reisetilskudd: false,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: null,
            },
            {
                __typename: 'Periode',
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                type: Periodetype.AktivitetIkkeMulig,
                behandlingsdager: null,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: {
                        __typename: 'MedisinskArsak',
                        arsak: [MedisinskArsakType.Annet, MedisinskArsakType.AktivitetForverrerTilstand],
                        beskrivelse: 'Dette er en beskrivelse av den medisinske årsaken.',
                    },
                    arbeidsrelatertArsak: {
                        __typename: 'ArbeidsrelatertArsak',
                        arsak: [ArbeidsrelatertArsakType.Annet],
                        beskrivelse: 'Dette er en beskrivelse av den arbeidsrelaterte årsaken',
                    },
                },
                reisetilskudd: false,
            },
            {
                __typename: 'Periode',
                fom: dateAdd(mottatt, { days: 6 }),
                tom: dateAdd(mottatt, { days: 11 }),
                type: Periodetype.Gradert,
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 20,
                    reisetilskudd: false,
                },
                reisetilskudd: false,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
                innspillTilArbeidsgiver: null,
            },
        ],
        medisinskVurdering: {
            __typename: 'MedisinskVurdering',
            hovedDiagnose: {
                __typename: 'Diagnose',
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Rar sykdom',
            },
            biDiagnoser: [
                {
                    __typename: 'Diagnose',
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Rar sykdom',
                },
                {
                    __typename: 'Diagnose',
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-59',
                    tekst: 'Sykdom0',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2018-10-18',
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak',
                beskrivelse:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                grunn: [AnnenFraverGrunn.NodvendigKontrollundenrsokelse],
            },
        },
        prognose: {
            __typename: 'Prognose',
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
            __typename: 'MeldingTilNAV',
            bistandUmiddelbart: true,
            beskrivBistand: 'Trenger hjelp med penger',
        },
        kontaktMedPasient: {
            __typename: 'KontaktMedPasient',
            kontaktDato: '2020-04-01',
            begrunnelseIkkeKontakt: 'Han var kjempesyk',
        },
        behandletTidspunkt: dateAdd(mottatt, { days: 10 }),
        behandler: {
            __typename: 'Behandler',
            fornavn: 'Fornavn',
            mellomnavn: null,
            etternavn: 'Etternavn',
            adresse: {
                __typename: 'Adresse',
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
            __typename: 'Pasient',
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
        ...overrides,
    };
}

export function createUnderBehandlingMerknad(): Pick<Sykmelding, 'merknader'> {
    return { merknader: [{ __typename: 'Merknad', type: 'UNDER_BEHANDLING', beskrivelse: null }] };
}

export function createAvvistBehandlingsutfall(
    reason = 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
): Pick<Sykmelding, 'behandlingsutfall'> {
    return {
        behandlingsutfall: {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Invalid,
            ruleHits: [
                {
                    __typename: 'RegelInfo',
                    messageForSender: reason,
                    messageForUser: reason,
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.Invalid,
                },
            ],
        },
    };
}

export function createMock<Query, Variables>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables };
    result?: FetchResult<Query> | ResultFunction<FetchResult<Query>>;
    error?: Error;
    delay?: number;
    newData?: ResultFunction<FetchResult>;
}): MockedResponse<Query> {
    return mockedResponse;
}
