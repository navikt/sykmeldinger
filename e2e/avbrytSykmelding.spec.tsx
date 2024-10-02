import { test, expect } from '@playwright/test'

import {
    gotoRoot,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
    velgArbeidstakerArbeidsledig,
} from './user-actions'

test.describe('Avbryt sykmelding', () => {
    test('should show sykmelding as avbrutt', async ({ page }) => {
        await gotoScenario('avbrutt')(page)
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: /Avbryt sykmeldingen/ })).not.toBeVisible()
        await expect(page.getByRole('button', { name: /GJØR UTFYLLINGEN PÅ NYTT/ })).toBeVisible()

        await expect(page).toHaveNoViolations()
    })

    test('should reopen avbrutt sykmelding', async ({ page }) => {
        await gotoScenario('avbrutt')(page)
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: /Avbryt sykmeldingen/ })).not.toBeVisible()

        await page.getByRole('button', { name: /GJØR UTFYLLINGEN PÅ NYTT/ }).click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).not.toBeVisible()
        await expect(page.getByRole('button', { name: /Avbryt sykmeldingen/ })).toBeVisible()
    })

    test('should avbryte open sykmelding', async ({ page }) => {
        await page.goto('/')
        await navigateToFirstSykmelding('nye', '100%')(page)

        await page.getByRole('button', { name: /Avbryt sykmeldingen/ }).click()
        await expect(page.getByText(/Er du sikker på at du vil avbryte sykmeldingen?/)).toBeVisible()
        await page.getByRole('button', { name: /Ja, jeg er sikker/ }).click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('link', { name: 'Til hovedsiden Ditt sykefravær' })).toBeVisible()

        await expect(page).toHaveNoViolations()
    })

    test('should be able to re-open and and avbryte bekreftet sykmelding', async ({ page }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('arbeidsledig')(page)
        await velgArbeidstakerArbeidsledig(/Pontypandy Fire Service/)(page)

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()
        await page.waitForURL('**/kvittering')
        await expect(page.getByText(/Sykmeldingen ble sendt til NAV./)).toBeVisible()

        await gotoRoot(page)
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await page.getByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }).click()

        await page.getByRole('button', { name: /Avbryt sykmeldingen/ }).click()
        await expect(page.getByText(/Er du sikker på at du vil avbryte sykmeldingen?/)).toBeVisible()
        await page.getByRole('button', { name: /Ja, jeg er sikker/ }).click()

        await expect(page.getByText(/Sykmeldingen ble avbrutt av deg/)).toBeVisible()
        await expect(page.getByRole('button', { name: /GJØR UTFYLLINGEN PÅ NYTT/ })).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should show details for avbrutt egenmelding sykmelding', async ({ page }) => {
        await gotoScenario('avbruttEgenmelding')(page)
        await navigateToFirstSykmelding('tidligere', 'egenmelding')(page)

        await expect(page.getByRole('heading', { name: 'Egenmeldingen ble avbrutt av deg' })).toBeVisible()

        await expect(page).toHaveNoViolations()
    })
})
