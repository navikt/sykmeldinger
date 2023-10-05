import { expect, describe, it } from 'vitest'
import { subDays } from 'date-fns'

import { toDate } from '../../../utils/dateUtils'

import { e2eScenarios } from './scenarios'

describe('e2e-scenarios', () => {
    it('buttAgainstAvventende should butt against', () => {
        const { sykmeldinger } = e2eScenarios.buttAgainstAvventende.scenario()

        const firstTom = toDate(sykmeldinger[0].sykmeldingsperioder[0].tom)
        const lastFom = toDate(sykmeldinger[1].sykmeldingsperioder[0].fom)

        expect(firstTom).toEqual(subDays(lastFom, 1))
    })
})
