import { expect, test } from '@playwright/test'

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
    })

    test.describe('without arbeidsgiver', () => {
        test('Hyre or Lott & Hyre without arbeidsgivere should get a warning/tips about what to do', async ({
            page,
        }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await fillOutFisker('Blad B', 'Både lott og hyre')(page)

            const expectedHint =
                'Hvis det stemmer at arbeidsforholdet ditt ikke skal registreres, kan du sende inn sykmeldingen til NAV som fisker ved å velge lott i stedet for hyre.'

            await expect(page.getByText(expectedHint)).toBeVisible()

            await getRadioInGroup(page)(
                { name: /Mottar du lott eller er du på hyre?/i },
                { name: 'Hyre', exact: true },
            ).click()

            await expect(page.getByText(expectedHint)).toBeVisible()
        })

        test('Hyre or Lott & Hyre should get a error if user tries to send sykmelding  without arbeidsgivere', async ({
            page,
        }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await fillOutFisker('Blad B', 'Både lott og hyre')(page)

            const expectedHint =
                'Hvis det stemmer at arbeidsforholdet ditt ikke skal registreres, kan du sende inn sykmeldingen til NAV som fisker ved å velge lott i stedet for hyre.'

            await expect(page.getByText(expectedHint)).toBeVisible()

            await getRadioInGroup(page)(
                { name: /Mottar du lott eller er du på hyre?/i },
                { name: 'Hyre', exact: true },
            ).click()

            await expect(page.getByText(expectedHint)).toBeVisible()

            await page.getByRole('button', { name: /Send sykmelding/ }).click()
            await expect(
                page.getByText(
                    /For å sende inn sykmeldingen må du fylle ut hvilken arbeidsforhold du er sykmeldt fra./,
                ),
            ).toBeVisible()
            await expect(page).toHaveNoViolations()
        })
    })
})
