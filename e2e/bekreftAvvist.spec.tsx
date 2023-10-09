import { test, expect } from '@playwright/test'
import { subDays } from 'date-fns'

import { toReadableDate } from '../src/utils/dateUtils'

import { expectNoAxeViolations, expectToHaveDescriptiveText, expectNotToHaveDescriptiveText } from './test-utils'

test.describe('Bekreft avvist sykmelding som lest', () => {
    test('should display reason for rejection', async ({ page }) => {
        await page.goto('/?scenario=avvist')

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Du trenger en ny sykmelding/)).toBeVisible()
        await expectNoAxeViolations(page)
    })

    test('should get error message when trying to submit without checking checkbox', async ({ page }) => {
        await page.goto('/?scenario=avvist')

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await expect(page.getByText(/Du trenger en ny sykmelding/)).toBeVisible()
        await page.getByRole('button', { name: 'Bekreft' }).click()

        await expectToHaveDescriptiveText(page)(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
            'Du må bekrefte at du har lest at sykmeldingen er avvist.',
        )

        await expectNoAxeViolations(page)
    })

    test('should remove error message after clicking checkbox', async ({ page }) => {
        await page.goto('/?scenario=avvist')

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await page.getByRole('button', { name: 'Bekreft' }).click()
        await expect(
            page.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        ).toBeVisible()

        await expectToHaveDescriptiveText(page)(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
            'Du må bekrefte at du har lest at sykmeldingen er avvist.',
        )

        await expectNoAxeViolations(page)

        await page
            .getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            })
            .click()

        await expectNotToHaveDescriptiveText()(
            page.getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            }),
        )

        await expectNoAxeViolations(page)
    })

    test('should show confirmation after submitting', async ({ page }) => {
        await page.goto('/?scenario=avvist')

        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await page
            .getByRole('checkbox', {
                name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist',
            })
            .click()

        await expectNoAxeViolations(page)

        await page.getByRole('button', { name: 'Bekreft' }).click()

        await expect(
            page.getByText(
                `Du bekreftet at du har lest at sykmeldingen er avvist den ${toReadableDate(subDays(new Date(), 7))}`,
            ),
        ).toBeVisible()

        await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()
        await expectNoAxeViolations(page)
    })
})
