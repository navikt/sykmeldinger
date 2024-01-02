import { test, expect } from '@playwright/test'

import { sporsmal } from '../src/utils/sporsmal'

import { gotoScenario, navigateToFirstSykmelding } from './user-actions'

test.describe('Ugyldig tilbakedatert sykmelding', () => {
    test('should show information about tilbakedatering without a11y issues', async ({ page }) => {
        await gotoScenario('ugyldigTilbakedatering')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByText(sporsmal.erOpplysningeneRiktige)).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Tilbakedateringen kan ikke godkjennes' })).toBeVisible()

        await expect(page).toHaveNoViolations()
    })
})
