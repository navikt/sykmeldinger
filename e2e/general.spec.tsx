import { test, expect } from '@playwright/test'

import { sporsmal } from '../src/utils/sporsmal'

import { gotoScenario, navigateToFirstSykmelding } from './user-actions'

test.describe('sykmelding page tests that are not specific to a user', () => {
    test('should show details from sykmelding without a11y problems', async ({ page }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByText(sporsmal.erOpplysningeneRiktige)).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('legacy: a user without any "bruker svar" should still be able to view kvittering', async ({ page }) => {
        await gotoScenario('noBrukerSvar')(page)
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await expect(page.getByText(/Sykmeldingen ble sendt til/)).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeVisible()
        await expect(page.getByRole('region', { name: 'Flere opplysninger' })).toBeVisible()
        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()

        await expect(page.getByRole('region', { name: 'Dine svar' })).not.toBeVisible()
        await expect(page).toHaveNoViolations()
    })
})
