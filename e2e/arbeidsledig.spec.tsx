import { test, expect } from '@playwright/test'
import { format, getDate, sub } from 'date-fns'
import { nb } from 'date-fns/locale'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Arbeidssituasjon - Arbeidsledig', () => {
    test('should be able to submit form with work situation arbeidsledig', async ({ page }) => {
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
            .getByRole('radio', { name: /arbeidsledig/ })
            .click()

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await page.waitForURL('**/kvittering')

        await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
    })

    test('should not send egenmeldingsdager and stuff when first filled out as arbeidsgiver, then changes back to arbeidsledig', async ({
        page,
    }) => {
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
            .getByRole('radio', { name: /ansatt/ })
            .click()

        await page
            .getByRole('group', { name: /Velg arbeidsgiver/i })
            .getByRole('radio', { name: /Pontypandy Fire Service org.nr: 110110110/i })
            .click()

        await page
            .getByRole('group', {
                name: /Er det station officer steele som skal følge deg opp på jobben mens du er syk/i,
            })
            .getByRole('radio', { name: /Nei/ })
            .click()

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
