import { Arbeidsgiver } from '../fetching/graphql.generated'

import { findValgtArbeidsgiver, isActiveArbeidsgiver } from './arbeidsgiverUtils'

describe('arbeidsgiverUtils', () => {
    describe('findValgtArbeidsgiver', () => {
        it('should return arbeidsgiver if given orgnummer matches', () => {
            const arbeidsgivere: Arbeidsgiver[] = [
                {
                    __typename: 'Arbeidsgiver',
                    naermesteLeder: {
                        __typename: 'NaermesteLeder',
                        navn: 'Lise',
                    },
                    navn: 'Vaskeri AS',
                    orgnummer: '78453253',
                    aktivtArbeidsforhold: true,
                },
                {
                    __typename: 'Arbeidsgiver',
                    naermesteLeder: {
                        __typename: 'NaermesteLeder',
                        navn: 'Knut',
                    },
                    navn: 'Snill Torpedo',
                    orgnummer: '84093212',
                    aktivtArbeidsforhold: true,
                },
            ]
            const orgnummer = '84093212'
            expect(findValgtArbeidsgiver(arbeidsgivere, orgnummer)).toBe(arbeidsgivere[1])
        })

        it('should return undefined if given orgnummer is not found in arbeidsgiver list', () => {
            const arbeidsgivere: Arbeidsgiver[] = [
                {
                    __typename: 'Arbeidsgiver',
                    naermesteLeder: {
                        __typename: 'NaermesteLeder',
                        navn: 'Lise',
                    },
                    navn: 'Vaskeri AS',
                    orgnummer: '78453253',
                    aktivtArbeidsforhold: true,
                },
            ]
            const orgnummer = '9894224'
            expect(findValgtArbeidsgiver(arbeidsgivere, orgnummer)).toBe(undefined)
        })
    })
    describe('isActiveArbeidsgiver', () => {
        const arbeidsgivereMock: Arbeidsgiver[] = [
            {
                __typename: 'Arbeidsgiver',
                naermesteLeder: {
                    __typename: 'NaermesteLeder',
                    navn: 'Lise',
                },
                navn: 'Vaskeri AS',
                orgnummer: '78453253',
                aktivtArbeidsforhold: false,
            },
            {
                __typename: 'Arbeidsgiver',
                naermesteLeder: {
                    __typename: 'NaermesteLeder',
                    navn: 'Knut',
                },
                navn: 'Snill Torpedo',
                orgnummer: '84093212',
                aktivtArbeidsforhold: true,
            },
        ]
        it('should return true if given arbeidsgiver is active and naermesteLeder is not null', () => {
            const orgnummer = '84093212'
            expect(isActiveArbeidsgiver(arbeidsgivereMock, orgnummer)).toBe(true)
        })

        it('should return false if given arbeidsgiver is not active', () => {
            const orgnummer = '78453253'
            expect(isActiveArbeidsgiver(arbeidsgivereMock, orgnummer)).toBe(false)
        })

        it('should return false if given arbeidsgiver is active but is missing naermesteLeder', () => {
            const arbeidsgivereMock: Arbeidsgiver[] = [
                {
                    __typename: 'Arbeidsgiver',
                    naermesteLeder: null,
                    navn: 'Snill Torpedo',
                    orgnummer: '84093212',
                    aktivtArbeidsforhold: true,
                },
            ]
            const orgnummer = '84093212'
            expect(isActiveArbeidsgiver(arbeidsgivereMock, orgnummer)).toBe(false)
        })
    })
})
