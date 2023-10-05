import { test, expect } from '@playwright/test'

import {
    changeScenario,
    expectNoAxeViolations,
    getRadioInGroup,
    setArbeidsgivereCount,
    setStrengtFortroligAdresse,
} from './test-utils'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Arbeidssituasjon - Arbeidstaker', () => {
    test('should be able to submit form with active arbeidsgiver and nærmeste leder', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()
        await getRadioInGroup(page)(
            { name: /Velg arbeidsgiver/i },
            { name: 'Pontypandy Fire Service org.nr: 110110110' },
        ).click()
        await getRadioInGroup(page)(
            { name: /Er det station officer steele som skal følge deg opp på jobben mens du er syk/i },
            { name: 'Ja' },
        ).click()
        await getRadioInGroup(page)(
            { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
            { name: 'Nei' },
        ).click()

        await expectNoAxeViolations(page)
        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
    })

    test('should be able to submit form with active arbeidsgiver and chosing "No" on correct narmeste leder', async ({
        page,
    }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()
        await getRadioInGroup(page)(
            { name: /Velg arbeidsgiver/i },
            { name: 'Pontypandy Fire Service org.nr: 110110110' },
        ).click()

        await getRadioInGroup(page)(
            { name: /Er det station officer steele som skal følge deg opp på jobben mens du er syk/i },
            { name: 'Nei' },
        ).click()

        await expect(
            page.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
        ).toBeVisible()

        await getRadioInGroup(page)(
            { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
            { name: 'Nei' },
        ).click()

        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
        await expectNoAxeViolations(page)
        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
    })

    test('should be able to submit form with inactive arbeidsgiver', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await setArbeidsgivereCount(page)(2)

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

        await getRadioInGroup(page)(
            { name: /Velg arbeidsgiver/i },
            { name: 'Andeby Brannstation org.nr: 110110112' },
        ).click()

        // Should ask about egenmeldingsdager even though arbeidsgiver is inactive
        await getRadioInGroup(page)(
            { name: /Brukte du egenmelding hos Andeby Brannstation i perioden/ },
            { name: 'Nei' },
        ).click()

        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
        await expectNoAxeViolations(page)
        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Andeby Brannstation' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
    })

    test('should be able to submit form with missing NL but active arbeidsgiver', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await setArbeidsgivereCount(page)(3)

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

        await getRadioInGroup(page)(
            { name: /Velg arbeidsgiver/i },
            { name: 'Nottinghamshire Missing Narmesteleder org.nr: 110110113' },
        ).click()

        // Should ask about egenmeldingsdager even though NL is null, but arbeidsforhold is active
        await getRadioInGroup(page)(
            { name: /Brukte du egenmelding hos Nottinghamshire Missing Narmesteleder i perioden/ },
            { name: 'Nei' },
        ).click()

        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
        await expectNoAxeViolations(page)
        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await page.waitForURL('**/kvittering')

        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Nottinghamshire Missing Narmesteleder' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
    })

    test('should show warning if user does not have any arbeidsforhold', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await setArbeidsgivereCount(page)(0)

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

        await expect(page.getByText(/Vi klarer ikke å finne noen arbeidsforhold registrert på deg/)).toBeVisible()
        await expectNoAxeViolations(page)
    })

    test('should show information for people with diskresjonskode strengt fortrilig adresse', async ({ page }) => {
        await page
            .getByRole('region', { name: /Nye sykmeldinger/i })
            .getByRole('link', { name: /Sykmelding 100%/ })
            .click()

        await setStrengtFortroligAdresse(page)

        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

        await expect(page.getByText(/Du er registrert med adressesperre/)).toBeVisible()
        await expectNoAxeViolations(page)
        await expect(page.getByRole('button', { name: 'Send sykmelding' })).not.toBeVisible()
        await expect(page.getByRole('button', { name: 'Bekreft sykmelding' })).not.toBeVisible()
    })

    test.describe('given previous sykmeldinger', () => {
        test('should collide with 100% sykmelding and show "Legg til egenmeldingsdager"', async ({ page }) => {
            await changeScenario(page)('buttAgainstGradert')

            await page
                .getByRole('region', { name: /Tidligere sykmeldinger/i })
                .getByRole('link', { name: /Sykmelding 100%/ })
                .click()

            await expectNoAxeViolations(page)

            await expect(page.getByRole('heading', { name: /Sykmeldingen ble sendt til/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()
        })

        test('should not collide with AVVENTENDE sykmeldinger and still show "Legg til egenmeldingsdager"', async ({
            page,
        }) => {
            await changeScenario(page)('buttAgainstAvventende')

            await page
                .getByRole('region', { name: /Tidligere sykmeldinger/i })
                .getByRole('link', { name: /Sykmelding 100%/ })
                .click()

            await expectNoAxeViolations(page)

            await expect(page.getByRole('heading', { name: /Sykmeldingen ble sendt til/ })).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        })
    })
})
