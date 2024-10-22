import { test, expect } from '@playwright/test'

import {
    bekreftSykmelding,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
} from './user-actions'
import { userInteractionsGroup } from './test-utils'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

test.describe('Ugyldig tilbakedatert sykmelding', () => {
    test('should show information about tilbakedatering and be able to submit form, without a11y issues', async ({
        page,
    }) => {
        await userInteractionsGroup(
            gotoScenario('ugyldigTilbakedatering'),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
        )(page)
        await expect(page.getByRole('heading', { name: 'Tilbakedateringen kan ikke godkjennes' })).toBeVisible()

        await velgArbeidssituasjon('annet')(page)
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
})
