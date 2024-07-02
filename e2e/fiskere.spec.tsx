import { test } from '@playwright/test'

import {
    bekreftNarmesteleder,
    bekreftSykmelding,
    fillOutFisker,
    frilanserEgenmeldingsperioder,
    gotoScenario,
    sendSykmelding,
    velgArbeidstaker,
    velgForsikring,
} from './user-actions'
import { getRadioInGroup } from './test-utils'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

test.describe('Arbeidssituasjon - Fiskere', () => {
    test.describe('Blad A', () => {
        test('Lott, should be næringsdrivende-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            // Behaves similar to normal nearingsdrivende
            await fillOutFisker('Blad A', 'Lott')(page)
            await frilanserEgenmeldingsperioder([
                {
                    fom: '01.01.2021',
                    tom: '02.01.2021',
                },
                {
                    fom: '04.01.2021',
                    tom: '06.01.2021',
                },
            ])(page)
            await velgForsikring('Ja')(page)

            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: ['1. - 2. januar 2021', '4. - 6. januar 2021'],
                    forsikring: 'Ja',
                },
                fisker: {
                    blad: 'A',
                    lottEllerHyre: 'Lott',
                },
            })(page)
        })

        test('Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad A', 'Hyre')(page)
            // Hyre behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                arbeidsgiver: '110110110',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Ja',
                },
                fisker: {
                    blad: 'A',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })

        test('Lott & Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad A', 'Både lott og hyre')(page)
            // 'Begge' behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                arbeidsgiver: '110110110',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Ja',
                },
                fisker: {
                    blad: 'A',
                    lottEllerHyre: 'Begge',
                },
            })(page)
        })

        test('Hyre, should be arbeidsgiver-esque, but user choses to bekrefte anyway', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad A', 'Hyre')(page)

            await page
                .getByRole('button', {
                    name: 'Dersom du ønsker å bekrefte sykmeldingen for nav, kan du gjøre dette her',
                })
                .click()
            await getRadioInGroup(page)(
                { name: /Vil du bekrefte sykmeldingen til NAV alikevel?/i },
                { name: 'Ja' },
            ).click()

            await frilanserEgenmeldingsperioder('Nei')(page)

            // No forsikring question when user choses to bekreft anyway on Hyre/Begge
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: 'Nei',
                    forsikring: 'Ja',
                },
                fisker: {
                    blad: 'A',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })

        test('Hyre, with zero arbeidsgivere, should automatically offer fallback', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await fillOutFisker('Blad A', 'Hyre')(page)
            await getRadioInGroup(page)(
                { name: /Vil du bekrefte sykmeldingen til NAV alikevel?/i },
                { name: 'Ja' },
            ).click()

            await frilanserEgenmeldingsperioder('Nei')(page)

            // No forsikring question when user choses to bekreft anyway on Hyre/Begge
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: 'Nei',
                    forsikring: 'Ja',
                },
                fisker: {
                    blad: 'A',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })
    })

    test.describe('Blad B', () => {
        test('Lott, should be næringsdrivende-esque without forsikring', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Lott')(page)
            await frilanserEgenmeldingsperioder([{ fom: '01.01.2021', tom: '02.01.2021' }])(page)
            // No forsikring question for Blad B
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: ['1. - 2. januar 2021'],
                    forsikring: ExpectMeta.NotInDom,
                },
                fisker: {
                    blad: 'B',
                    lottEllerHyre: 'Lott',
                },
            })(page)
        })

        test('Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Hyre')(page)
            // Hyre behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                arbeidsgiver: 'Pontypandy Fire Service',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Ja',
                },
                fisker: {
                    blad: 'B',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })

        test('Lott & Hyre, should be arbeidsgiver-esque', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Både lott og hyre')(page)
            // 'Begge' behaves similar to normal arbeidstaker
            await velgArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele')(page)
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                arbeidsgiver: 'Pontypandy Fire Service',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Ja',
                },
                fisker: {
                    blad: 'B',
                    lottEllerHyre: 'Begge',
                },
            })(page)
        })

        test('Hyre, should be arbeidsgiver-esque, but user choses to bekrefte anyway', async ({ page }) => {
            await gotoScenario('normal')(page)
            await fillOutFisker('Blad B', 'Hyre')(page)

            await page
                .getByRole('button', {
                    name: 'Dersom du ønsker å bekrefte sykmeldingen for nav, kan du gjøre dette her',
                })
                .click()
            await getRadioInGroup(page)(
                { name: /Vil du bekrefte sykmeldingen til NAV alikevel?/i },
                { name: 'Ja' },
            ).click()

            await frilanserEgenmeldingsperioder('Nei')(page)

            // No forsikring question when user choses to bekreft anyway on Hyre/Begge
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: 'Nei',
                    forsikring: 'Ja',
                },
                fisker: {
                    blad: 'B',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })

        test('Hyre, with zero arbeidsgivere, should automatically offer fallback', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await fillOutFisker('Blad B', 'Hyre')(page)
            await getRadioInGroup(page)(
                { name: /Vil du bekrefte sykmeldingen til NAV alikevel?/i },
                { name: 'Ja' },
            ).click()

            await frilanserEgenmeldingsperioder('Nei')(page)

            // No forsikring question when user choses to bekreft anyway on Hyre/Begge
            await bekreftSykmelding(page)

            await expectKvittering({
                sendtTil: 'NAV',
                egenmeldingsdager: ExpectMeta.NotInDom,
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Fisker',
                selvstendig: {
                    egenmeldingsperioder: 'Nei',
                    forsikring: 'Ja',
                },
                fisker: {
                    blad: 'B',
                    lottEllerHyre: 'Hyre',
                },
            })(page)
        })
    })
})
