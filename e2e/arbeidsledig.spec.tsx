import { test, expect } from '@playwright/test'
import { format, getDate, sub } from 'date-fns'
import { nb } from 'date-fns/locale'

import {
    bekreftNarmesteleder,
    filloutArbeidstaker,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
} from './user-actions'

test.describe('Arbeidssituasjon - Arbeidsledig', () => {
    test('should be able to submit form with work situation arbeidsledig', async ({ page }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('arbeidsledig')(page)

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })

    test('should not send egenmeldingsdager and stuff when first filled out as arbeidsgiver, then changes back to arbeidsledig', async ({
        page,
    }) => {
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele', 'Nei')(page)

        await expect(
            page.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
        ).toBeVisible()

        await page
            .getByRole('group', { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ })
            .getByRole('radio', { name: /Ja/ })
            .click()

        const today = new Date()
        const sixteenDaysAgo = sub(today, { days: 16 })

        await page.getByRole('button', { name: format(today, 'd. MMMM (EEEE)', { locale: nb }) }).click()
        await page.getByRole('button', { name: /Videre/ }).click()
        await page
            .getByRole('group', {
                name: new RegExp(
                    `Brukte du egenmelding hos Pontypandy Fire Service i perioden ${getDate(sixteenDaysAgo)}`,
                    'i',
                ),
            })
            .getByRole('radio', { name: /Nei/ })
            .click()

        // Change to arbeidsledig
        await page
            .getByRole('group', { name: /Jeg er sykmeldt som/i })
            .getByRole('radio', { name: /arbeidsledig/ })
            .click()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('heading', { name: /Egenmeldingsdager/ })).not.toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })
})
