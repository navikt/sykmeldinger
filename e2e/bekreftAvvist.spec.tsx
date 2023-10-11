import { test, expect } from '@playwright/test'
import { subDays } from 'date-fns'

import { toReadableDate } from '../src/utils/dateUtils'

import { gotoScenario, navigateToFirstSykmelding } from './user-actions'

test.describe('Bekreft avvist sykmelding som lest', () => {
    test('should display reason for rejection', async ({ page }) => {
        await gotoScenario('avvist')(page)

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Du trenger en ny sykmelding/)).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should get error message when trying to submit without checking checkbox', async ({ page }) => {
        await gotoScenario('avvist')(page)

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Du trenger en ny sykmelding/)).toBeVisible()
        await page.getByRole('button', { name: 'Bekreft' }).click()

        await expect(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
        ).toHaveDescriptiveText('Du må bekrefte at du har lest at sykmeldingen er avvist.')

        await expect(page).toHaveNoViolations()
    })

    test('should remove error message after clicking checkbox', async ({ page }) => {
        await gotoScenario('avvist')(page)

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await page.getByRole('button', { name: 'Bekreft' }).click()
        await expect(
            page.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        ).toBeVisible()

        await expect(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
        ).toHaveDescriptiveText('Du må bekrefte at du har lest at sykmeldingen er avvist.')

        await expect(page).toHaveNoViolations()

        await page
            .getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            })
            .click()

        await expect(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
        ).not.toHaveDescriptiveText()

        await expect(page).toHaveNoViolations()
    })

    test('should show confirmation after submitting', async ({ page }) => {
        await gotoScenario('avvist')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await page
            .getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            })
            .click()

        await expect(page).toHaveNoViolations()

        await page.getByRole('button', { name: 'Bekreft' }).click()

        await expect(
            page.getByText(
                `Du bekreftet at du har lest at sykmeldingen er avvist den ${toReadableDate(subDays(new Date(), 7))}`,
            ),
        ).toBeVisible()

        await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()
        await expect(page).toHaveNoViolations()
    })
})
