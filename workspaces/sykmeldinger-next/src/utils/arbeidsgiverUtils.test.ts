import { describe, it, expect } from 'vitest'

import { Arbeidsgiver } from 'queries'

import { findValgtArbeidsgiver } from './arbeidsgiverUtils'

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
})
