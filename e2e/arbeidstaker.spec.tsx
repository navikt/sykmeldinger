import { test, expect } from '@playwright/test'

import { getRadioInGroup } from './test-utils'
import {
    bekreftNarmesteleder,
    filloutArbeidstaker,
    gotoScenario,
    navigateToFirstSykmelding,
    sendSykmelding,
} from './user-actions'

test.describe('Arbeidssituasjon - Arbeidstaker', () => {
    test.describe('normal situation', () => {
        test('should be able to submit form with active arbeidsgiver and nærmeste leder', async ({ page }) => {
            await gotoScenario('normal')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)

            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()

            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        })

        test('should be able to submit form with active arbeidsgiver and chosing "No" on correct narmeste leder', async ({
            page,
        }) => {
            await gotoScenario('normal')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele', 'Nei')(page)

            await expect(
                page.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
            ).toBeVisible()

            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        })

        test('should be able to submit form with inactive arbeidsgiver', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 2,
            })(page)

            await filloutArbeidstaker(/Andeby Brannstation/)(page)

            // Should ask about egenmeldingsdager even though arbeidsgiver is inactive
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Andeby Brannstation i perioden/ },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Andeby Brannstation' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        })

        test('should be able to submit form with missing NL but active arbeidsgiver', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 3,
            })(page)

            await filloutArbeidstaker(/Nottinghamshire Missing Narmesteleder/)(page)

            // Should ask about egenmeldingsdager even though NL is null, but arbeidsforhold is active
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Nottinghamshire Missing Narmesteleder i perioden/ },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expect(
                page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Nottinghamshire Missing Narmesteleder' }),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        })

        test('should show warning if user does not have any arbeidsforhold', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
            await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

            await expect(page.getByText(/Vi klarer ikke å finne noen arbeidsforhold registrert på deg/)).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show information for people with diskresjonskode strengt fortrilig adresse', async ({ page }) => {
            await gotoScenario('normal', {
                strengtFortroligAdresse: true,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
            await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

            await expect(page.getByText(/Du er registrert med adressesperre/)).toBeVisible()
            await expect(page).toHaveNoViolations()
            await expect(page.getByRole('button', { name: 'Send sykmelding' })).not.toBeVisible()
            await expect(page.getByRole('button', { name: 'Bekreft sykmelding' })).not.toBeVisible()
        })
    })

    test.describe('given previous sykmeldinger', () => {
        test('should collide with 100% sykmelding and show "Legg til egenmeldingsdager"', async ({ page }) => {
            await gotoScenario('buttAgainstGradert')(page)

            await navigateToFirstSykmelding('tidligere', '100%')(page)

            await expect(page.getByRole('heading', { name: /Sykmeldingen ble sendt til/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()

            await expect(page).toHaveNoViolations()
        })

        test('should not collide with AVVENTENDE sykmeldinger and still show "Legg til egenmeldingsdager"', async ({
            page,
        }) => {
            await gotoScenario('buttAgainstAvventende')(page)

            await navigateToFirstSykmelding('tidligere', '100%')(page)

            await expect(page.getByRole('heading', { name: /Sykmeldingen ble sendt til/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()

            await expect(page).toHaveNoViolations()
        })
    })
})
