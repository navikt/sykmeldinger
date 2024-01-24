import { test } from '@playwright/test'

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
import { userInteractionsGroup } from './test-utils'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

const navigateToFirstAndPickSituasjon = userInteractionsGroup(
    navigateToFirstSykmelding('nye', '100%'),
    opplysingeneStemmer,
    velgArbeidssituasjon('selvstendig næringsdrivende'),
)

test.describe('Selvstendig næringsdrivende', () => {
    test.describe('Within ventetid', () => {
        test('should be able to submit form', async ({ page }) => {
            await userInteractionsGroup(
                gotoScenario('normal', {
                    oppfolgingsdato: '2021-04-05',
                }),
                navigateToFirstAndPickSituasjon,
                expectOppfolgingsdato('2021-04-05'),
                frilanserEgenmeldingsperioder([{ fom: '20.12.2020', tom: '27.12.2020' }]),
                velgForsikring('Ja'),
                bekreftSykmelding,
            )(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Selvstendig næringsdrivende',
                selvstendig: {
                    egenmeldingsperioder: ['20. - 27. desember 2020'],
                    forsikring: 'Ja',
                },
            })(page)
        })

        test('should use first fom in sykmelding period if oppfolgingsdato is missing', async ({ page }) => {
            await userInteractionsGroup(
                gotoScenario('normal', {
                    oppfolgingsdato: null,
                }),
                navigateToFirstAndPickSituasjon,
                expectOppfolgingsdato('2021-04-10'),
                frilanserEgenmeldingsperioder([{ fom: '20.12.2020', tom: '27.12.2020' }]),
                velgForsikring('Ja'),
                bekreftSykmelding,
            )(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Selvstendig næringsdrivende',
                selvstendig: {
                    egenmeldingsperioder: ['20. - 27. desember 2020'],
                    forsikring: 'Ja',
                },
            })(page)
        })
    })

    test.describe('Outside ventetid', () => {
        test('should be able to submit form', async ({ page }) => {
            await userInteractionsGroup(
                gotoScenario('normal', {
                    erUtenforVentetid: true,
                }),
                navigateToFirstAndPickSituasjon,
                bekreftSykmelding,
            )(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Selvstendig næringsdrivende',
                selvstendig: {
                    egenmeldingsperioder: ExpectMeta.NotInDom,
                    forsikring: ExpectMeta.NotInDom,
                },
            })(page)
        })
    })
})
