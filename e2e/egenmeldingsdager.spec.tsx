import * as R from 'remeda'
import { test, expect, Page } from '@playwright/test'
import { add, format, getDate, sub } from 'date-fns'
import { nb } from 'date-fns/locale'

import { bekreftNarmesteleder, filloutArbeidstaker, gotoScenario } from './user-actions'

function selectEgenmeldingsdager({
    daysToSelect,
    initialDate,
}: {
    daysToSelect: [...number[][], 'Nei']
    initialDate: Date
}) {
    return async (page: Page): Promise<void> => {
        const [currentDays, ...restDays] = daysToSelect
        const section = page.getByLabel(
            new RegExp(`Brukte du egenmelding hos Pontypandy Fire Service i perioden ${getDate(initialDate)}`, 'i'),
        )

        if (currentDays === 'Nei') {
            await section.getByRole('radio', { name: /Nei/ }).click()
            return
        }

        await section.getByRole('radio', { name: /Ja/ }).click()
        const datesToClick = currentDays.map((day) => add(initialDate, { days: day }))
        for (const date of datesToClick) {
            await page.getByRole('button', { name: format(date, 'd. MMMM (EEEE)', { locale: nb }) }).click()
        }
        await section.getByRole('button', { name: /Videre/ }).click()

        const earliestDate = R.minBy(datesToClick, (date) => date.getTime())!
        return await selectEgenmeldingsdager({
            daysToSelect: restDays as [...number[][], 'Nei'],
            initialDate: sub(earliestDate, { days: 16 }),
        })(page)
    }
}

test.describe('Egenmeldingsdager', () => {
    test('should be able to submit form with one period of egenmeldingsdager', async ({ page }) => {
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)

        await selectEgenmeldingsdager({
            daysToSelect: [[14, 13], 'Nei'],
            initialDate: sub(new Date(), { days: 9 }),
        })(page)

        await expect(page).toHaveNoViolations()

        await expectNumberOfEgenmeldingsdagerInput(2)(page)

        await page.getByRole('button', { name: /Send sykmelding/ }).click()

        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Endre egenmeldingsdager/ })).toBeVisible()
    })

    test('should be able to submit form with two periods of egenmeldingsdager', async ({ page }) => {
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)
        await selectEgenmeldingsdager({
            daysToSelect: [[13, 12], [2, 3], 'Nei'],
            initialDate: sub(new Date(), { days: 9 }),
        })(page)

        await expect(page).toHaveNoViolations()

        await expectNumberOfEgenmeldingsdagerInput(4)(page)

        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Endre egenmeldingsdager/ })).toBeVisible()
    })

    test('should be able to submit form after editing previous period with egenmeldingsdager', async ({ page }) => {
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)

        await selectEgenmeldingsdager({
            daysToSelect: [[14, 13], [1, 2], 'Nei'],
            initialDate: sub(new Date(), { days: 9 }),
        })(page)

        // Edit the second period to be no instead of 2 dates
        await page
            .getByLabel(/Brukte du egenmelding hos Pontypandy Fire Service i perioden/i)
            .nth(1)
            .getByRole('radio', { name: /Nei/i })
            .click()

        await expectNumberOfEgenmeldingsdagerInput(2)(page)

        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /Endre egenmeldingsdager/ })).toBeVisible()
    })

    test(`should NOT be asked about egenmeldingsdager when sykmelding is right against
        previous sykmelding tom AND should inform about what will be sent to arbeidsgiver`, async ({ page }) => {
        await gotoScenario('unsentButtAgainstNormal')(page)
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)

        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()

        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /^(Endre|Legg til) egenmeldingsdager/ })).not.toBeVisible()
    })

    test(`should be asked about egenmeldingsdager when sykmelding is right against AVVENTENDE sykmelding`, async ({
        page,
    }) => {
        await gotoScenario('buttAgainstAvventende')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)
        await selectEgenmeldingsdager({
            daysToSelect: ['Nei'],
            initialDate: sub(new Date(), { days: 22 }),
        })(page)

        await expect(page).toHaveNoViolations()

        await page.getByRole('button', { name: /Send sykmelding/ }).click()
        await expect(
            page.getByRole('heading', { name: 'Sykmeldingen ble sendt til Pontypandy Fire Service' }),
        ).toBeVisible()
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()

        await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
    })
})

function expectNumberOfEgenmeldingsdagerInput(expectedNumberOfDays: number) {
    return async (page: Page): Promise<void> => {
        const visesTilArbeidsgiverSection = page.getByRole('region', { name: 'Se hva som sendes til jobben din' })
        await visesTilArbeidsgiverSection.click()

        await expect(
            visesTilArbeidsgiverSection
                .getByRole('region', { name: 'Perioder (f.o.m. - t.o.m.)' })
                .getByText(`(${expectedNumberOfDays} dager)`),
        ).toBeVisible()
        await visesTilArbeidsgiverSection.click()
    }
}
