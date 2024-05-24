import { expect, describe, it } from 'vitest'
import { subDays } from 'date-fns'

import { StatusEvent } from 'queries'

import { toDate } from '../../../utils/dateUtils'

import { e2eScenarios } from './scenarios'

describe('e2e-scenarios', () => {
    it('buttAgainstAvventende should butt against', () => {
        const { sykmeldinger } = e2eScenarios.buttAgainstAvventende.scenario()

        const firstTom = toDate(sykmeldinger[0].sykmeldingsperioder[0].tom)
        const lastFom = toDate(sykmeldinger[1].sykmeldingsperioder[0].fom)

        expect(firstTom).toEqual(subDays(lastFom, 1))
    })

    it('unsentButtAgainstNormal should butt against', () => {
        const { sykmeldinger } = e2eScenarios.unsentButtAgainstNormal.scenario()

        const firstTom = toDate(sykmeldinger[0].sykmeldingsperioder[0].tom)
        const lastFom = toDate(sykmeldinger[1].sykmeldingsperioder[0].fom)

        expect(sykmeldinger[0].sykmeldingStatus.statusEvent).toEqual(StatusEvent.SENDT)
        expect(sykmeldinger[1].sykmeldingStatus.statusEvent).toEqual(StatusEvent.APEN)
        expect(firstTom).toEqual(subDays(lastFom, 1))
    })
})
