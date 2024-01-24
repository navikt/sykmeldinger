import { test } from '@playwright/test'

import {
    bekreftSykmelding,
    gotoScenario,
    navigateToFirstSykmelding,
    opplysingeneStemmer,
    velgArbeidssituasjon,
} from './user-actions'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'
import { userInteractionsGroup } from './test-utils'

test.describe('Arbeidssituasjon - Permittert', () => {
    /**
     * This fallback from PERMITTERT to ARBEIDSLEDIG used to happen in the frontend, it has been moved
     * to the mapping in the API layer
     */
    test('should submit PERMITTERT when user choose radio button permittert', async ({ page }) => {
        await userInteractionsGroup(
            gotoScenario('normal'),
            navigateToFirstSykmelding('nye', '100%'),
            opplysingeneStemmer,
            velgArbeidssituasjon('permittert'),
            bekreftSykmelding,
        )(page)

        await expectKvittering({
            sendtTil: 'NAV',
            egenmeldingsdager: ExpectMeta.NotInDom,
        })(page)
        await expectDineSvar({
            arbeidssituasjon: 'Arbeidsledig',
        })(page)
    })
})
