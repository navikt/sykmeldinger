import { expect, test } from '@playwright/test'
import { format, getDate, sub } from 'date-fns'
import { nb } from 'date-fns/locale'

import {
    bekreftNarmesteleder,
    bekreftSykmelding,
    filloutArbeidstaker,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
    velgArbeidstakerArbeidsledig,
} from './user-actions'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'
import { userInteractionsGroup } from './test-utils'

test.describe('Arbeidssituasjon - Arbeidsledig', () => {
    test('should be able to submit form with work situation arbeidsledig, without arbeidsgiver', async ({ page }) => {
        await userInteractionsGroup(
            gotoScenario('normal', { antallArbeidsgivere: 0 }),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('arbeidsledig'),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Arbeidsledig',
            arbeidsledig: ExpectMeta.NotInDom,
        })(page)
    })

    test('should not send egenmeldingsdager and stuff when first filled out as arbeidsgiver, then changes back to arbeidsledig', async ({
        page,
    }) => {
        await userInteractionsGroup(
            gotoScenario('normal'),
            filloutArbeidstaker(/Pontypandy Fire Service/),
            bekreftNarmesteleder('Station Officer Steele', 'Nei'),
        )(page)

        await expect(
            page.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
        ).toBeVisible()

        await page
            .getByRole('group', { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ })
            .getByRole('radio', { name: /Ja/ })
            .click()

        const today = new Date()
        const sixteenDaysAgo = sub(today, { days: 16 })

        await page
            .getByRole('button', { name: format(today, 'EEEE d', { locale: nb }), includeHidden: false, exact: true })
            .click()
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
        await velgArbeidstakerArbeidsledig(/Pontypandy Fire Service/)(page)

        await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)
        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Arbeidsledig',
            arbeidsledig: {
                arbeidsledigFraOrgnummer: '110110110',
            },
        })(page)
    })

    test('should be able to submit form with work situation arbeidsledig, with arbeidsgiver', async ({ page }) => {
        await userInteractionsGroup(
            gotoScenario('normal', { antallArbeidsgivere: 2 }),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('arbeidsledig'),
            velgArbeidstakerArbeidsledig(/Pontypandy Fire Service/),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Arbeidsledig',
            arbeidsledig: {
                arbeidsledigFraOrgnummer: '110110110',
            },
        })(page)
    })

    test('should be able to submit form with work situation arbeidsledig, when arbeidsgiver is "Ikke relevant"', async ({
        page,
    }) => {
        await userInteractionsGroup(
            gotoScenario('normal', { antallArbeidsgivere: 2 }),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('arbeidsledig'),
            velgArbeidstakerArbeidsledig(/Ikke relevant/),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Arbeidsledig',
            arbeidsledig: ExpectMeta.NotInDom,
        })(page)
    })
})
