import { describe, it, expect } from 'vitest'

import { ArbeidssituasjonType } from 'queries'

import { isArbeidstaker, isFrilanserOrNaeringsdrivende } from './arbeidssituasjonUtils'

describe('arbeidssituasjonUtils', () => {
    describe('isArbeidstaker', () => {
        it('should return true if arbeidssituasjon is ARBEIDSTAKER', () => {
            expect(isArbeidstaker(ArbeidssituasjonType.ARBEIDSTAKER)).toBe(true)
        })

        it('should return true if arbeidssituasjon is other than ARBEIDSTAKER', () => {
            expect(isArbeidstaker(ArbeidssituasjonType.PERMITTERT)).toBe(false)
        })
    })

    describe('isFrilanserOrNaeringsdrivende', () => {
        it('should return true if arbeidssituasjon is FRILANSER', () => {
            expect(isFrilanserOrNaeringsdrivende(ArbeidssituasjonType.FRILANSER)).toBe(true)
        })

        it('should return true if arbeidssituasjon is NAERINGSDRIVENDE', () => {
            expect(isFrilanserOrNaeringsdrivende(ArbeidssituasjonType.FRILANSER)).toBe(true)
        })

        it('should return false if arbeidssituasjon is other than FRILANSER or NAERINGSDRIVENDE', () => {
            expect(isFrilanserOrNaeringsdrivende(ArbeidssituasjonType.ARBEIDSTAKER)).toBe(false)
        })
    })
})
