import { test, expect } from '@playwright/test'

import {
    bekreftSykmelding,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
} from './user-actions'

test.describe('Bekreftet sykmelding', () => {
    test('should reopen brekreftet sykmelding', async ({ page }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('annet')(page)
        await bekreftSykmelding(page)

        await page.goto('/')
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await page.getByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }).click()
        await expect(page.getByRole('button', { name: 'Bekreft sykmelding' })).toBeVisible()
        await expect(page).toHaveNoViolations()
    })
})
