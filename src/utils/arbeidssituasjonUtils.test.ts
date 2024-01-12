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
        it('should return true if arbeidssituasjon is FRILANSER or NARINGSDRIVENDE or JORDBRUKER', () => {
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.FRILANSER)).toBe(true)
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.NAERINGSDRIVENDE)).toBe(true)
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.JORDBRUKER)).toBe(true)
        })

        it('should return false if arbeidssituasjon is other than FRILANSER or NAERINGSDRIVENDE or JORDBRUKER', () => {
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.ARBEIDSTAKER)).toBe(false)
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.ANNET)).toBe(false)
            expect(isFrilanserOrNaeringsdrivendeOrJordbruker(ArbeidssituasjonType.FISKER)).toBe(false)
        })
    })
})
