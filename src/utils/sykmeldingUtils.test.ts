import { describe, expect, it } from 'vitest'

import { Merknadtype, RegelStatus, StatusEvent, SykmeldingFragment } from 'queries'

import {
    getReadableSykmeldingLength,
    getSykmeldingEndDate,
    getSykmeldingStartDate,
    getSykmeldingTitle,
    isActiveSykmelding,
} from './sykmeldingUtils'
import { dateSub } from './dateUtils'
import { createSykmeldingPeriode } from './test/dataUtils'

const minimalSykmelding: SykmeldingFragment = {
    __typename: 'Sykmelding',
    id: 'APEN_PAPIR',
    mottattTidspunkt: dateSub(new Date(), { days: 1 }),
    behandlingsutfall: {
        __typename: 'Behandlingsutfall',
        status: RegelStatus.OK,
        ruleHits: [],
    },
    arbeidsgiver: null,
    sykmeldingsperioder: [],
    sykmeldingStatus: {
        __typename: 'SykmeldingStatus',
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.APEN,
        sporsmalOgSvarListe: [],
        arbeidsgiver: null,
    },
    medisinskVurdering: null,
    utdypendeOpplysninger: {},
    kontaktMedPasient: { __typename: 'KontaktMedPasient', kontaktDato: null, begrunnelseIkkeKontakt: null },
    behandletTidspunkt: '2020-01-01',
    behandler: {
        __typename: 'Behandler',
        fornavn: 'Fornavn',
        mellomnavn: null,
        etternavn: 'Etternavn',
        adresse: {
            __typename: 'Adresse',
            gate: null,
            postnummer: null,
            kommune: null,
            postboks: null,
            land: null,
        },
        tlf: '900 00 000',
    },
    egenmeldt: null,
    papirsykmelding: null,
    merknader: null,
    pasient: {
        __typename: 'Pasient',
        fnr: '123456789',
        fornavn: null,
        mellomnavn: null,
        etternavn: null,
        overSyttiAar: null,
    },
    andreTiltak: null,
    meldingTilArbeidsgiver: null,
    meldingTilNAV: null,
    prognose: null,
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    utenlandskSykmelding: null,
    rulesetVersion: 2,
}

describe('isActiveSykmelding', () => {
    it('should be inactive if status is not APEN', () => {
        expect(
            isActiveSykmelding({
                ...minimalSykmelding,
                sykmeldingStatus: {
                    ...minimalSykmelding.sykmeldingStatus,
                    statusEvent: StatusEvent.AVBRUTT,
                },
            }),
        ).toBe(false)
    })

    it('should be inactive if status is SENDT', () => {
        expect(
            isActiveSykmelding({
                ...minimalSykmelding,
                sykmeldingStatus: {
                    ...minimalSykmelding.sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                },
            }),
        ).toBe(false)
    })

    it('should be NOT be active if status is SENDT with merknad UNDER_BEHANDLING', () => {
        expect(
            isActiveSykmelding({
                ...minimalSykmelding,
                sykmeldingStatus: {
                    ...minimalSykmelding.sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                },
                merknader: [{ __typename: 'Merknad', type: Merknadtype.UNDER_BEHANDLING, beskrivelse: null }],
            }),
        ).toBe(false)
    })

    it('should be active if status is APEN', () => {
        expect(
            isActiveSykmelding({
                ...minimalSykmelding,
                sykmeldingStatus: {
                    ...minimalSykmelding.sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                },
            }),
        ).toBe(true)
    })

    it('should be inactive if status is APEN but older than a year', () => {
        expect(
            isActiveSykmelding({
                ...minimalSykmelding,
                mottattTidspunkt: dateSub(new Date(), { days: 365 }),
                sykmeldingStatus: {
                    ...minimalSykmelding.sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                },
            }),
        ).toBe(false)
    })
})

describe('getSykmeldingTitle', () => {
    it('Gets standard sykmelding title', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
        }
        expect(getSykmeldingTitle(sykmelding)).toEqual('Sykmelding')
    })

    it('Gets papirsykmelding title', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            papirsykmelding: true,
        }
        expect(getSykmeldingTitle(sykmelding)).toEqual('Papirsykmelding')
    })

    it('Gets egenmeldt title', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            egenmeldt: true,
        }
        expect(getSykmeldingTitle(sykmelding)).toEqual('Egenmelding')
    })

    it('Gets utenlandsk title', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            utenlandskSykmelding: {
                __typename: 'UtenlandskSykmelding',
                land: 'Sverige',
            },
        }
        expect(getSykmeldingTitle(sykmelding)).toEqual('Utenlandsk sykmelding')
    })
})

describe('getSykmeldingStartDate', () => {
    it('Gets fom of the earliest period', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [
                createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
                createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
            ],
        }
        expect(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)).toEqual('2021-04-01')
    })
})

describe('getSykmeldingEndDate', () => {
    it('Gets tom of the latest period', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [
                createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
            ],
        }
        expect(getSykmeldingEndDate(sykmelding.sykmeldingsperioder)).toEqual('2021-06-03')
    })
})

describe('getReadableSykmeldingLength', () => {
    it('Lenght is one day', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-01' })],
        }
        expect(getReadableSykmeldingLength(sykmelding)).toBe('1. juni 2021')
    })

    it('Within same year', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [
                createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
            ],
        }
        expect(getReadableSykmeldingLength(sykmelding)).toBe('1. april - 3. juni 2021')
    })

    it('Within same year and month', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [
                createSykmeldingPeriode({ fom: '2021-06-20', tom: '2021-06-24' }),
                createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                createSykmeldingPeriode({ fom: '2021-06-06', tom: '2021-06-09' }),
            ],
        }
        expect(getReadableSykmeldingLength(sykmelding)).toBe('1. - 24. juni 2021')
    })

    it('Different years', () => {
        const sykmelding: SykmeldingFragment = {
            ...minimalSykmelding,
            sykmeldingsperioder: [
                createSykmeldingPeriode({ fom: '2020-12-25', tom: '2020-12-31' }),
                createSykmeldingPeriode({ fom: '2021-01-01', tom: '2021-01-06' }),
            ],
        }
        expect(getReadableSykmeldingLength(sykmelding)).toBe('25. desember 2020 - 6. januar 2021')
    })
})
