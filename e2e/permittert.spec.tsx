import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Arbeidssituasjon - Permittert', () => {
    /**
     * This fallback from PERMITTERT to ARBEIDSLEDIG used to happen in the frontend, it has been moved
     * to the mapping in the API layer
     */
    test('should submit PERMITTERT when user choose radio button permittert', async ({ page }) => {
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
            .getByRole('radio', { name: /permittert/ })
            .click()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })
})
