import { MockedResponse } from '@apollo/client/testing'
import { Cache, TypedDocumentNode } from '@apollo/client'
import { FetchResult } from '@apollo/client/link/core'
import { ResultFunction } from '@apollo/client/testing/core/mocking/mockLink'

import {
    AnnenFraverGrunn,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    PeriodeFragment,
    Periodetype,
    RegelStatus,
    StatusEvent,
    Sykmelding,
    SykmeldingFragment,
} from '../../fetching/graphql.generated'
import { dateAdd, dateSub } from '../dateUtils'

export function createSykmelding(
    overrides?: Partial<SykmeldingFragment>,
    statusEvent = StatusEvent.APEN,
): SykmeldingFragment {
    const mottatt = overrides?.mottattTidspunkt ?? dateSub(new Date(), { days: 2 })

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
            status: RegelStatus.OK,
            ruleHits: [],
        },
        arbeidsgiver: {
            __typename: 'ArbeidsgiverSykmelding',
            navn: 'Navn Navnesen',
        },
        merknader: null,
        meldingTilArbeidsgiver: null,
        sykmeldingsperioder: [
            createSykmeldingPeriode({
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                behandlingsdager: 2,
                type: Periodetype.BEHANDLINGSDAGER,
            }),
            createSykmeldingPeriode({
                fom: mottatt,
                tom: dateAdd(mottatt, { days: 5 }),
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: {
                        __typename: 'MedisinskArsak',
                        arsak: [MedisinskArsakType.ANNET, MedisinskArsakType.AKTIVITET_FORVERRER_TILSTAND],
                        beskrivelse: 'Dette er en beskrivelse av den medisinske årsaken.',
                    },
                    arbeidsrelatertArsak: {
                        __typename: 'ArbeidsrelatertArsak',
                        arsak: [ArbeidsrelatertArsakType.ANNET],
                        beskrivelse: 'Dette er en beskrivelse av den arbeidsrelaterte årsaken',
                    },
                },
            }),
            createSykmeldingPeriode({
                fom: dateAdd(mottatt, { days: 6 }),
                tom: dateAdd(mottatt, { days: 11 }),
                type: Periodetype.GRADERT,
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 20,
                    reisetilskudd: false,
                },
            }),
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
                grunn: [AnnenFraverGrunn.NODVENDIG_KONTROLLUNDENRSOKELSE],
            },
        },
        prognose: {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'Du må ta det rolig på jobben',
            erIArbeid: null,
            erIkkeIArbeid: null,
        },
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
        egenmeldt: false,
        papirsykmelding: false,
        pasient: {
            __typename: 'Pasient',
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
        utenlandskSykmelding: null,
        rulesetVersion: 2,
        ...overrides,
    }
}

export const createSykmeldingPeriode = (overrides?: Partial<PeriodeFragment>): PeriodeFragment => ({
    __typename: 'Periode',
    type: Periodetype.REISETILSKUDD,
    fom: '2020-04-01',
    tom: '2020-04-15',
    gradert: null,
    behandlingsdager: null,
    innspillTilArbeidsgiver: null,
    aktivitetIkkeMulig: null,
    reisetilskudd: false,
    ...overrides,
})

export function createUnderBehandlingMerknad(): Pick<Sykmelding, 'merknader'> {
    return { merknader: [{ __typename: 'Merknad', type: 'UNDER_BEHANDLING', beskrivelse: null }] }
}

export function createAvvistBehandlingsutfall(
    reason = 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
): Pick<Sykmelding, 'behandlingsutfall'> {
    return {
        behandlingsutfall: {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.INVALID,
            ruleHits: [
                {
                    __typename: 'RegelInfo',
                    messageForSender: reason,
                    messageForUser: reason,
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.INVALID,
                },
            ],
        },
    }
}

export function createInitialQuery<Query, Variables>(
    typedDocumentNode: TypedDocumentNode<Query, Variables>,
    data: Query,
    variables?: Variables,
): Cache.WriteQueryOptions<Query, Variables> {
    return {
        query: typedDocumentNode,
        data,
        variables,
    }
}

export function createMock<Query, Variables extends Record<string, unknown>>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables }
    result?: FetchResult<Query> | ResultFunction<FetchResult<Query>>
    error?: Error
    delay?: number
    newData?: ResultFunction<FetchResult>
}): MockedResponse<Query> {
    return mockedResponse
}
