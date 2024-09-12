import { expect, test } from '@playwright/test'

import {
    bekreftSykmelding,
    expectOppfolgingsdato,
    frilanserEgenmeldingsperioder,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
    velgForsikring,
} from './user-actions'
import { getRadioInGroup, userInteractionsGroup } from './test-utils'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

test.describe('Frilanser', () => {
    test.describe('Within ventetid', () => {
        test('should be able to submit form with egenmeldingsperiode and forsikring', async ({ page }) => {
            await userInteractionsGroup(
                gotoScenario('normal', {
                    erUtenforVentetid: false,
                    oppfolgingsdato: '2021-04-01',
                }),
                navigateToFirstSykmelding('nye', '100%'),
                opplysingeneStemmer,
                velgArbeidssituasjon('frilanser'),
                expectOppfolgingsdato('2021-04-01'),
                frilanserEgenmeldingsperioder([{ fom: '20.12.2020', tom: '27.12.2020' }]),
                velgForsikring('Ja'),
                bekreftSykmelding,
            )(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Frilanser',
                selvstendig: {
                    egenmeldingsperioder: ['20. - 27. desember 2020'],
                    forsikring: 'Ja',
                },
            })(page)
        })

        test('should use first fom in sykmelding period if oppfolgingsdato is missing', async ({ page }) => {
            await userInteractionsGroup(
                gotoScenario('normal', {
                    erUtenforVentetid: false,
                    oppfolgingsdato: null,
                }),
                navigateToFirstSykmelding('nye', '100%'),
                opplysingeneStemmer,
                velgArbeidssituasjon('frilanser'),
                expectOppfolgingsdato('2021-04-10'),
                frilanserEgenmeldingsperioder([{ fom: '20.03.2021', tom: '27.03.2021' }]),
                velgForsikring('Ja'),
                bekreftSykmelding,
            )(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Frilanser',
                selvstendig: {
                    egenmeldingsperioder: ['20. - 27. mars 2021'],
                    forsikring: 'Ja',
                },
            })(page)
        })
    })

    test.describe('Outside ventetid', () => {
        test('should be able to submit form', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: true,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)

            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Frilanser',
                selvstendig: {
                    egenmeldingsperioder: ExpectMeta.NotInDom,
                    forsikring: ExpectMeta.NotInDom,
                },
            })(page)
        })
    })

    test.describe('Egenmeldingsperioder', () => {
        test('should show error message with link if date is missing', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding eller papirsykmelding før denne datoen?/i },
                { name: 'Ja' },
            ).click()

            await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()
            await expect(page.getByRole('link', { name: 'Du må fylle inn fra dato.' })).toBeVisible()
            await expect(page.getByRole('link', { name: 'Du må fylle inn til dato.' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show error message with link if date is invalid format', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder([{ fom: '11.20.2020', tom: '11.25.2020' }])(page)

            await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

            await expect(page.getByRole('link', { name: 'Fra dato må være på formatet DD.MM.YYYY.' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show error message with link if fom is after oppfølgingsdato', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
                oppfolgingsdato: '2020-04-01',
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder([{ fom: '02.04.2020', tom: '04.04.2020' }])(page)

            await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

            await expect(
                page.getByRole('link', { name: 'Fra dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show error message with link if tom is after oppfølgingsdato', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
                oppfolgingsdato: '2020-04-01',
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder([{ fom: '01.01.2020', tom: '02.05.2020' }])(page)

            await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

            await expect(
                page.getByRole('link', { name: 'Til dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show error message with link if fom is after tom', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder([{ fom: '10.01.2020', tom: '02.01.2020' }])(page)

            await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

            await expect(page.getByRole('link', { name: 'Fra kan ikke være etter til dato.' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should be able to remove period', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
                oppfolgingsdato: '2020-04-01',
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder([
                { fom: '01.01.2020', tom: '02.05.2020' },
                { fom: '', tom: '' },
            ])(page)

            await expect(page.getByRole('textbox', { name: /(Fra|Til) og med/ })).toHaveCount(4)
            await page.getByRole('button', { name: 'Fjern periode' }).click()
            await expect(page.getByRole('textbox', { name: /(Fra|Til) og med/ })).toHaveCount(2)

            await expect(page).toHaveNoViolations()
        })

        test('should be able to submit form without egenmeldingsperioder and forsikring', async ({ page }) => {
            await gotoScenario('normal', {
                erUtenforVentetid: false,
                oppfolgingsdato: '2020-04-01',
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)
            await opplysingeneStemmer(page)
            await velgArbeidssituasjon('frilanser')(page)
            await frilanserEgenmeldingsperioder('Nei')(page)
            await velgForsikring('Nei')(page)
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Frilanser',
                selvstendig: {
                    egenmeldingsperioder: 'Nei',
                    forsikring: 'Nei',
                },
            })(page)
        })
    })
})
