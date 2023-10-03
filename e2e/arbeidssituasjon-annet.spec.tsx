import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Arbeidssituasjon - Annet', () => {
    test('should be able to submit form with work situation annet', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await page
            .getByRole('group', { name: /Stemmer opplysningene?/ })
            .getByRole('radio', { name: /Ja/ })
            .click()

        await page
            .getByRole('group', { name: /Jeg er sykmeldt som/i })
            .getByRole('radio', { name: /annet/ })
            .click()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })
})
