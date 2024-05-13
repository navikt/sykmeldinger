import * as R from 'remeda'
import { expect, Page, test } from '@playwright/test'
import { add, format, getDate, sub } from 'date-fns'
import { nb } from 'date-fns/locale'

import { bekreftNarmesteleder, filloutArbeidstaker, gotoScenario } from './user-actions'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

function selectEgenmeldingsdager({
    daysToSelect,
    initialDate,
}: {
    daysToSelect: [...number[][], 'Nei' | ExpectMeta.NotInDom]
    initialDate: Date
}) {
    return async (page: Page): Promise<void> => {
        const [currentDays, ...restDays] = daysToSelect

        // Had to use test-id her because certain dates, two periods that start on the same day across two months will be in the DOM
        const section = page.getByTestId('last-egenmelding-section')

        if (currentDays === 'Nei') {
            await expect(
                page
                    .getByLabel(
                        new RegExp(
                            `Brukte du egenmelding hos Pontypandy Fire Service i perioden ${getDate(initialDate)}. `,
                            'i',
                        ),
                    )
                    .last(),
            ).toBeVisible()
            await section.getByRole('radio', { name: /Nei/ }).click()
            return
        }

        if (currentDays === ExpectMeta.NotInDom) {
            await expect(section.getByRole('radio', { name: /Nei/ })).not.toBeVisible()
            return
        }

        await expect(
            page
                .getByLabel(
                    new RegExp(
                        `Brukte du egenmelding hos Pontypandy Fire Service i perioden ${getDate(initialDate)}. `,
                        'i',
                    ),
                )
                .last(),
        ).toBeVisible()
        await section.getByRole('radio', { name: /Ja/ }).click()
        const datesToClick = currentDays.map((day) => add(initialDate, { days: day }))
        for (const date of datesToClick) {
            const dateButton = page.getByRole('button', { name: format(date, 'EEEE d', { locale: nb }), exact: true })
            if (!(await dateButton.isVisible())) {
                const previousMonthButton = page.getByRole('button', { name: 'Gå til forrige måned' })
                if (await previousMonthButton.isDisabled()) {
                    await page.getByRole('button', { name: 'Gå til neste måned' }).click()
                } else {
                    await previousMonthButton.click()
                }
            }

            await dateButton.click()
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

        await expectKvittering({
            sendtTil: 'Pontypandy Fire Service',
            egenmeldingsdager: 'endre',
        })(page)

        await expectDineSvar({
            arbeidssituasjon: 'Ansatt',
            narmesteleder: {
                navn: 'Station Officer Steele',
                svar: 'Ja',
            },
            egenmeldingsdager: {
                arbeidsgiver: 'Pontypandy Fire Service',
                antallDager: 2,
            },
        })(page)
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

        await expectKvittering({
            sendtTil: 'Pontypandy Fire Service',
            egenmeldingsdager: 'endre',
        })(page)

        await expectDineSvar({
            arbeidssituasjon: 'Ansatt',
            narmesteleder: {
                navn: 'Station Officer Steele',
                svar: 'Ja',
            },
            egenmeldingsdager: {
                arbeidsgiver: 'Pontypandy Fire Service',
                antallDager: 4,
            },
        })(page)
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

        await expectKvittering({
            sendtTil: 'Pontypandy Fire Service',
            egenmeldingsdager: 'endre',
        })(page)

        await expectDineSvar({
            arbeidssituasjon: 'Ansatt',
            narmesteleder: {
                navn: 'Station Officer Steele',
                svar: 'Ja',
            },
            egenmeldingsdager: {
                arbeidsgiver: 'Pontypandy Fire Service',
                antallDager: 2,
            },
        })(page)
    })

    test(`should NOT be asked about egenmeldingsdager when sykmelding is right against
        previous sykmelding tom AND should inform about what will be sent to arbeidsgiver`, async ({ page }) => {
        await gotoScenario('unsentButtAgainstNormal')(page)
        await gotoScenario('normal')(page)
        await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
        await bekreftNarmesteleder('Station Officer Steele')(page)

        await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()

        await page.getByRole('button', { name: /Send sykmelding/ }).click()

        await expectKvittering({
            sendtTil: 'Pontypandy Fire Service',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            arbeidssituasjon: 'Ansatt',
            narmesteleder: {
                navn: 'Station Officer Steele',
                svar: 'Ja',
            },
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)
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

        await expectKvittering({
            sendtTil: 'Pontypandy Fire Service',
            egenmeldingsdager: 'legg til',
        })(page)

        await expectDineSvar({
            arbeidssituasjon: 'Ansatt',
            narmesteleder: {
                navn: 'Station Officer Steele',
                svar: 'Ja',
            },
            egenmeldingsdager: {
                arbeidsgiver: 'Pontypandy Fire Service',
                svar: 'Nei',
            },
        })(page)
    })

    test.describe('limiting to 16 egenmeldingsdager', () => {
        const pickArbeidsgiverAndBoss = async (page: Page): Promise<void> => {
            await gotoScenario('kunNy')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
        }

        const expect16EgenmeldingsdagerAndEverythingGood = async (page: Page): Promise<void> => {
            await expect(
                page.getByText('Du har valgt 16 egenmeldingsdager, og trenger ikke å velge flere.'),
            ).toBeVisible()
            await expect(page).toHaveNoViolations()

            await expectNumberOfEgenmeldingsdagerInput(16)(page)

            await page.getByRole('button', { name: /Send sykmelding/ }).click()

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'endre',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Ansatt',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Ja',
                },
                egenmeldingsdager: {
                    arbeidsgiver: 'Pontypandy Fire Service',
                    antallDager: 16,
                },
            })(page)
        }

        test('should be warned and allowed to submit when selecting 16 egenmeldingsdager on a single period', async ({
            page,
        }) => {
            await pickArbeidsgiverAndBoss(page)
            await selectEgenmeldingsdager({
                daysToSelect: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ExpectMeta.NotInDom],
                initialDate: sub(new Date(), { days: 9 }),
            })(page)

            await expect16EgenmeldingsdagerAndEverythingGood(page)
        })

        test('should be warned and allowed to submit when selecting 16 egenmeldingsdager over two periods', async ({
            page,
        }) => {
            await pickArbeidsgiverAndBoss(page)
            await selectEgenmeldingsdager({
                daysToSelect: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], [2], ExpectMeta.NotInDom],
                initialDate: sub(new Date(), { days: 9 }),
            })(page)

            await expect16EgenmeldingsdagerAndEverythingGood(page)
        })

        test('should be warned and allowed to submit when selecting 16 egenmeldingsdager over multiple periods', async ({
            page,
        }) => {
            await pickArbeidsgiverAndBoss(page)
            await selectEgenmeldingsdager({
                daysToSelect: [
                    [0, 2, 4, 6],
                    [2, 4, 9],
                    [2, 8],
                    [3], // Comment so prettier keeps this beautiful thing
                    [4, 8],
                    [3, 5, 7, 9],
                    ExpectMeta.NotInDom,
                ],
                initialDate: sub(new Date(), { days: 9 }),
            })(page)

            await expect16EgenmeldingsdagerAndEverythingGood(page)
        })

        test('should be warned and allowed to submit when selecting 16 egenmeldingsdager 16 single day periods', async ({
            page,
        }) => {
            await gotoScenario('kunNy')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await selectEgenmeldingsdager({
                daysToSelect: [...R.range(0, 16).map(() => [0]), ExpectMeta.NotInDom],
                initialDate: sub(new Date(), { days: 9 }),
            })(page)

            await expect16EgenmeldingsdagerAndEverythingGood(page)
        })
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
