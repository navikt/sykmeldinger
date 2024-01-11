import { describe, it, expect } from 'vitest'

import { ArbeidssituasjonType } from 'queries'

import { isArbeidstaker, isFrilanserOrNaeringsdrivendeOrJordbruker } from './arbeidssituasjonUtils'

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
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.FRILANSER)).toBe(true)
        })

        it('should return true if arbeidssituasjon is NAERINGSDRIVENDE', () => {
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.FRILANSER)).toBe(true)
        })

        it('should return false if arbeidssituasjon is other than FRILANSER or NAERINGSDRIVENDE', () => {
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.ARBEIDSTAKER)).toBe(false)
        })
    })
})
