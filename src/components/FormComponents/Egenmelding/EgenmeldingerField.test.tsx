import { describe, it, expect } from 'vitest'

import { YesOrNo } from '../../../fetching/graphql.generated'
import { toDate } from '../../../utils/dateUtils'

import { laterPeriodsRemoved } from './EgenmeldingerField'

describe('EgenmeldingerField', () => {
    describe('edit period', () => {
        it('should remove periods after editing period based on index', () => {
            const egenmeldingsdager = [
                {
                    harPerioder: YesOrNo.YES,
                    datoer: [toDate('2022-12-08'), toDate('2022-12-09')],
                    hasClickedVidere: true,
                },
                {
                    harPerioder: YesOrNo.YES,
                    datoer: [toDate('2022-11-24'), toDate('2022-11-25')],
                    hasClickedVidere: true,
                },
                {
                    harPerioder: YesOrNo.YES,
                    datoer: [toDate('2022-11-19')],
                    hasClickedVidere: true,
                },
            ]
            expect(laterPeriodsRemoved(1, false, egenmeldingsdager)).toEqual([
                egenmeldingsdager[0],
                egenmeldingsdager[1],
            ])
        })
    })
})
