import { describe, it, expect } from 'vitest'

import { YesOrNo } from 'queries'

import { hasCompletedEgenmeldingsdager } from './egenmeldingsdagerUtils'

describe('hasCompletedEgenmeldingsdager', () => {
    it('should return true if harPerioder is NO with one period', () => {
        const egenmeldingsperioder = [
            {
                harPerioder: YesOrNo.NO,
                datoer: null,
                hasClickedVidere: null,
            },
        ]
        expect(hasCompletedEgenmeldingsdager(egenmeldingsperioder)).toBe(true)
    })

    it('should return false if harPerioder is YES with one period', () => {
        const egenmeldingsperioder = [
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
        ]
        expect(hasCompletedEgenmeldingsdager(egenmeldingsperioder)).toBe(false)
    })

    it('should return true if harPerioder is NO in the last period', () => {
        const egenmeldingsperioder = [
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
            {
                harPerioder: YesOrNo.NO,
                datoer: null,
                hasClickedVidere: null,
            },
        ]
        expect(hasCompletedEgenmeldingsdager(egenmeldingsperioder)).toBe(true)
    })

    it('should return false if harPerioder is YES in the last period', () => {
        const egenmeldingsperioder = [
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
            {
                harPerioder: YesOrNo.YES,
                datoer: null,
                hasClickedVidere: null,
            },
        ]
        expect(hasCompletedEgenmeldingsdager(egenmeldingsperioder)).toBe(false)
    })
})
