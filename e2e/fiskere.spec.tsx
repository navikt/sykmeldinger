import { expect, test } from '@playwright/test'

import {
    bekreftNarmesteleder,
    bekreftSykmelding,
    fillOutFisker,
    frilanserEgenmeldingsperioder,
    gotoScenario,
    sendSykmelding,
    velgArbeidstaker,
    velgForsikring,
} from './user-actions'
import { getRadioInGroup } from './test-utils'

test.describe('Arbeidssituasjon - Fiskere', () => {
    test.describe('Blad A', () => {
        test('Lott, should be næringsdrivende-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            // Behaves similar to normal nearingsdrivende
            await fillOutFisker('Blad A', 'Lott')(page)
            await frilanserEgenmeldingsperioder([
                {
                    fom: '01.01.2021',
                    tom: '02.01.2021',
                },
                {
                    fom: '04.01.2021',
                    tom: '06.01.2021',
                },
            ])(page)
            await velgForsikring('Ja')(page)

            await bekreftSykmelding(page)

            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })

        test('Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad A', 'Hyre')(page)
            // Hyre behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })

        test('Lott & Hyre, should be næringsdrivende-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            // Behaves similar to normal nearingsdrivende
            await fillOutFisker('Blad A', 'Både lott og hyre')(page)
            await frilanserEgenmeldingsperioder([
                {
                    fom: '01.01.2021',
                    tom: '02.01.2021',
                },
                {
                    fom: '04.01.2021',
                    tom: '06.01.2021',
                },
            ])(page)
            await velgForsikring('Ja')(page)

            await bekreftSykmelding(page)

            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })
    })

    test.describe('Blad B', () => {
        test('Lott, should be næringsdrivende-esque without forsikring', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Lott')(page)
            await frilanserEgenmeldingsperioder([{ fom: '01.01.2021', tom: '02.01.2021' }])(page)
            // No forsikring question for Blad B
            await bekreftSykmelding(page)

            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })

        test('Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Hyre')(page)
            // Hyre behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })

        test('Lott & Hyre, should be næringsdrivende-esque without forsikring', async ({ page }) => {
            await gotoScenario('normal')(page)
            // Behaves similar to normal nearingsdrivende
            await fillOutFisker('Blad B', 'Både lott og hyre')(page)
            await frilanserEgenmeldingsperioder([{ fom: '01.01.2021', tom: '02.01.2021' }])(page)
            // No forsikring question for Blad B
            await bekreftSykmelding(page)

            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        })
    })
})
