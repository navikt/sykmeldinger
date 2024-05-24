import { describe, expect, it } from 'vitest'

import { YesOrNo } from 'queries'

import { toDate, toDateString } from '../../../utils/dateUtils'

import { cumulativeDays, currentPeriodDatePicker } from './egenmeldingsdagerFieldUtils'
import { EgenmeldingsdagerFormValue } from './EgenmeldingerField'

describe('egenmeldingsdagerFieldUtils', () => {
    describe('root case', () => {
        it('should give a period of 16 previous days', () => {
            const [earliest, latest] = currentPeriodDatePicker(
                {
                    earliestPossibleDate: toDate('2022-05-17'),
                    earliestSelectedDate: null,
                },
                null,
            )

            expect(toDateString(earliest)).toEqual('2022-05-01')
            expect(toDateString(latest)).toEqual('2022-05-16')
        })

        it('with previous sykmelding should give a period days until previous sykmelding', () => {
            const [earliest, latest] = currentPeriodDatePicker(
                {
                    earliestPossibleDate: toDate('2022-05-17'),
                    earliestSelectedDate: null,
                },
                toDate('2022-05-10'),
            )

            expect(toDateString(earliest)).toEqual('2022-05-11')
            expect(toDateString(latest)).toEqual('2022-05-16')
        })
    })

    describe('recursive case', () => {
        it('period should be from previous selected minus 16, but should not include already asked days', () => {
            const [earliest, latest] = currentPeriodDatePicker(
                {
                    earliestPossibleDate: toDate('2022-05-01'),
                    earliestSelectedDate: toDate('2022-05-05'),
                },
                null,
            )

            expect(toDateString(earliest)).toEqual('2022-04-19')
            expect(toDateString(latest)).toEqual('2022-04-30')
        })

        it('period should be from previous selected minus 16, but should not include already asked days, edge case with 1 day', () => {
            const [earliest, latest] = currentPeriodDatePicker(
                {
                    earliestPossibleDate: toDate('2022-05-01'),
                    earliestSelectedDate: toDate('2022-05-16'),
                },
                null,
            )

            expect(toDateString(earliest)).toEqual('2022-04-30')
            expect(toDateString(latest)).toEqual('2022-04-30')
        })

        it('period should be from previous selected minus 16, but should not include already asked days, edge case with 1 day', () => {
            const [earliest, latest] = currentPeriodDatePicker(
                {
                    earliestPossibleDate: toDate('2022-04-30'),
                    earliestSelectedDate: toDate('2022-04-30'),
                },
                null,
            )

            expect(toDateString(earliest)).toEqual('2022-04-14')
            expect(toDateString(latest)).toEqual('2022-04-29')
        })

        describe('given previous sykmelding', () => {
            it('period should be from previous selected minus 16, but should not include already asked days, and not go past previous sykmelding tom', () => {
                const [earliest, latest] = currentPeriodDatePicker(
                    {
                        earliestPossibleDate: toDate('2022-05-01'),
                        earliestSelectedDate: toDate('2022-05-05'),
                    },
                    toDate('2022-04-22'),
                )

                expect(toDateString(earliest)).toEqual('2022-04-23')
                expect(toDateString(latest)).toEqual('2022-04-30')
            })

            it('edge case when all days are asked, and the previous sykmelding to date is limiting the earliest date', () => {
                const [earliest, latest] = currentPeriodDatePicker(
                    {
                        earliestPossibleDate: toDate('2022-04-15'),
                        earliestSelectedDate: toDate('2022-04-17'),
                    },
                    toDate('2022-04-14'),
                )

                // We expect the earliest to be after latest, this edge case is handled in the parent component
                expect(toDateString(earliest)).toEqual('2022-04-15')
                expect(toDateString(latest)).toEqual('2022-04-14')
            })
        })
    })
})

describe('cumulativeDays', () => {
    it('should give cumulative days for the first period', () => {
        const noPeriods: EgenmeldingsdagerFormValue[] = []
        const { cumulativeBefore, cumulativeIncluding } = cumulativeDays(noPeriods, 0)

        expect(cumulativeBefore).toEqual(0)
        expect(cumulativeIncluding).toEqual(0)
    })

    it('should handle single un-touched form value', () => {
        const singleNotTouched: EgenmeldingsdagerFormValue[] = [
            {
                datoer: null,
                harPerioder: null,
                hasClickedVidere: null,
            },
        ]
        const { cumulativeBefore, cumulativeIncluding } = cumulativeDays(singleNotTouched, 0)

        expect(cumulativeBefore).toEqual(0)
        expect(cumulativeIncluding).toEqual(0)
    })

    it('should handle single touched form value', () => {
        const singleNotTouched: EgenmeldingsdagerFormValue[] = [
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: null,
            },
        ]
        const { cumulativeBefore, cumulativeIncluding } = cumulativeDays(singleNotTouched, 0)

        expect(cumulativeBefore).toEqual(0)
        expect(cumulativeIncluding).toEqual(2)
    })

    it('should handle touched+untouched form value', () => {
        const singleNotTouched: EgenmeldingsdagerFormValue[] = [
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: null,
            },
            {
                datoer: null,
                harPerioder: null,
                hasClickedVidere: null,
            },
        ]
        const { cumulativeBefore, cumulativeIncluding } = cumulativeDays(singleNotTouched, 1)

        expect(cumulativeBefore).toEqual(2)
        expect(cumulativeIncluding).toEqual(2)
    })

    it('should handle touched+untouched form value when index 0', () => {
        const singleNotTouched: EgenmeldingsdagerFormValue[] = [
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: null,
            },
            {
                datoer: null,
                harPerioder: null,
                hasClickedVidere: null,
            },
        ]
        const { cumulativeBefore, cumulativeIncluding } = cumulativeDays(singleNotTouched, 0)

        expect(cumulativeBefore).toEqual(0)
        expect(cumulativeIncluding).toEqual(2)
    })

    it('should handle multiple', () => {
        const singleNotTouched: EgenmeldingsdagerFormValue[] = [
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: true,
            },
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: true,
            },
            {
                datoer: [new Date(2024, 1, 15), new Date(2024, 1, 17)],
                harPerioder: YesOrNo.YES,
                hasClickedVidere: true,
            },
        ]

        expect(cumulativeDays(singleNotTouched, 0)).toEqual({ cumulativeBefore: 0, cumulativeIncluding: 2 })
        expect(cumulativeDays(singleNotTouched, 1)).toEqual({ cumulativeBefore: 2, cumulativeIncluding: 4 })
        expect(cumulativeDays(singleNotTouched, 2)).toEqual({ cumulativeBefore: 4, cumulativeIncluding: 6 })
    })
})
