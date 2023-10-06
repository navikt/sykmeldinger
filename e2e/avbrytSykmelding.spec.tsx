import { test, expect } from '@playwright/test'

import { expectNoAxeViolations } from './test-utils'

test.describe('Avbryt sykmelding', () => {
    test('should show sykmelding as avbrutt', async ({ page }) => {
        await page.goto('/?scenario=avbrutt')

        await page
            .getByRole('region', { name: /Tidligere sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: /Jeg vil avbryte sykmeldingen/ })).not.toBeVisible()
        await expect(page.getByRole('button', { name: /GJØR UTFYLLINGEN PÅ NYTT/ })).toBeVisible()

        await expectNoAxeViolations(page)
    })

    test('should reopen avbrutt sykmelding', async ({ page }) => {
        await page.goto('/?scenario=avbrutt')

        await page
            .getByRole('region', { name: /Tidligere sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: /Jeg vil avbryte sykmeldingen/ })).not.toBeVisible()

        await page.getByRole('button', { name: /GJØR UTFYLLINGEN PÅ NYTT/ }).click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).not.toBeVisible()
        await expect(page.getByRole('button', { name: /Jeg vil avbryte sykmeldingen/ })).toBeVisible()
    })

    test('should avbryte open sykmelding', async ({ page }) => {
        await page.goto('/')

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await page.getByRole('button', { name: /Jeg vil avbryte sykmeldingen/ }).click()
        await expect(page.getByText(/Er du sikker på at du vil avbryte sykmeldingen?/)).toBeVisible()
        await page.getByRole('button', { name: /Ja, jeg er sikker/ }).click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()

        await expectNoAxeViolations(page)
    })

    test('should show details for avbrutt egenmelding sykmelding', async ({ page }) => {
        await page.goto('/?scenario=avbruttEgenmelding')

        await page
            .getByRole('region', { name: /Tidligere sykmeldinger/i })
            .getByRole('link', { name: /Egenmelding/ })
            .click()

        await expect(page.getByRole('heading', { name: 'Egenmeldingen ble avbrutt av deg' })).toBeVisible()

        await expectNoAxeViolations(page)
    })
})
