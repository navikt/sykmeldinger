import { test, expect } from '@playwright/test'

import {
    expectOppfolgingsdato,
    frilanserEgenmeldingsperioder,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
    velgForsikring,
} from './user-actions'

test.describe('Jordbruker', () => {
    test('should be able to submit form within ventetid', async ({ page }) => {
        await gotoScenario('normal', {
            erUtenforVentetid: false,
            oppfolgingsdato: '2021-04-01',
        })(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('jordbruker')(page)

        await expectOppfolgingsdato('2021-04-01')(page)
        await frilanserEgenmeldingsperioder([{ fom: '20.12.2020', tom: '27.12.2020' }])(page)
        await velgForsikring('Ja')(page)

        await expect(page).toHaveNoViolations()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('heading', { name: /Egenmeldingsdager/ })).not.toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })

    test('should be able to submit form outside ventetid', async ({ page }) => {
        await gotoScenario('normal', {
            erUtenforVentetid: true,
        })(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('jordbruker')(page)

        await expect(page).toHaveNoViolations()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('heading', { name: /Egenmeldingsdager/ })).not.toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })
})
