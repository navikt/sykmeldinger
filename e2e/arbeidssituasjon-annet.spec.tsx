import { expect, test } from '@playwright/test'

import {
    bekreftSykmelding,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgAnnetSituasjon,
    velgArbeidssituasjon,
    velgArbeidstakerArbeidsledig,
} from './user-actions'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'
import { userInteractionsGroup } from './test-utils'

test.describe('Arbeidssituasjon - Annet', () => {
    test('should be able to submit form with work situation annet', async ({ page }) => {
        await userInteractionsGroup(
            gotoScenario('normal'),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('annet'),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdagerInfo: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Annet',
        })(page)
    })

    test('should show hint about work situation and be able to submit form with work situation annet/Student', async ({
        page,
    }) => {
        await userInteractionsGroup(
            gotoScenario('normal'),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('annet'),
            velgAnnetSituasjon('Student'),
        )(page)
        await expect(page.getByText('Har du valgt rett situasjon?')).toBeVisible()
        await bekreftSykmelding(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdagerInfo: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Annet',
        })(page)
    })

    test('should show hint about work situation annet/Dagpenger and be able to submit form with work situation Arbeidsledig', async ({
        page,
    }) => {
        await userInteractionsGroup(
            gotoScenario('normal'),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('annet'),
            velgAnnetSituasjon('Dagpenger'),
        )(page)
        await expect(page.getByText('Har du valgt rett situasjon?')).toBeVisible()
        await userInteractionsGroup(
            velgArbeidssituasjon('arbeidsledig'),
            velgArbeidstakerArbeidsledig(/Pontypandy Fire Service/),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdagerInfo: ExpectMeta.NotInDom,
        })(page)

        await expectDineSvar({
            stemmer: 'Ja',
            arbeidssituasjon: 'Arbeidsledig',
            arbeidsledig: {
                arbeidsledigFraOrgnummer: '110110110',
            },
        })(page)
    })
})
