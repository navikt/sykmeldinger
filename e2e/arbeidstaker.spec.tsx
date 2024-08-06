import { expect, test } from '@playwright/test'

import { getRadioInGroup } from './test-utils'
import {
    bekreftNarmesteleder,
    filloutArbeidstaker,
    gotoScenario,
    navigateToFirstSykmelding,
    sendSykmelding,
} from './user-actions'
import { expectDineSvar, expectKvittering, ExpectMeta } from './user-expects'

test.describe('Arbeidssituasjon - Arbeidstaker', () => {
    test.describe('normal situation', () => {
        test('should be able to submit form with active arbeidsgiver and nærmeste leder', async ({ page }) => {
            await gotoScenario('normal')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
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
                arbeidssituasjon: 'Ansatt',
                arbeidsgiver: 'Pontypandy Fire Service',
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

        test('should be able to submit form with active arbeidsgiver and chosing "No" on correct narmeste leder', async ({
            page,
        }) => {
            await gotoScenario('normal')(page)
            await filloutArbeidstaker(/Pontypandy Fire Service/)(page)
            await bekreftNarmesteleder('Station Officer Steele', 'Nei')(page)

            await expect(
                page.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
            ).toBeVisible()

            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Pontypandy Fire Service i perioden/ },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Pontypandy Fire Service',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Ansatt',
                arbeidsgiver: '110110110',
                narmesteleder: {
                    navn: 'Station Officer Steele',
                    svar: 'Nei',
                },
                egenmeldingsdager: {
                    arbeidsgiver: 'Pontypandy Fire Service',
                    svar: 'Nei',
                },
            })(page)
        })

        test('should be able to submit form with inactive arbeidsgiver', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 4,
            })(page)

            await filloutArbeidstaker(/Mt.frank Storbyuniversitet Studiestedettilnoenveldigviktige Pekepinnstredet/)(
                page,
            )

            await getRadioInGroup(page)(
                {
                    name: /Er du syk fra flere arbeidsforhold i denne perioden/,
                },
                { name: 'Nei' },
            ).click()

            // Should ask about egenmeldingsdager even though arbeidsgiver is inactive
            await getRadioInGroup(page)(
                {
                    name: /Brukte du egenmelding hos Mt.frank Storbyuniversitet Studiestedettilnoenveldigviktige Pekepinnstredet i perioden/,
                },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Mt.frank Storbyuniversitet Studiestedettilnoenveldigviktige Pekepinnstredet',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Ansatt',
                arbeidsgiver: '120120124',
                narmesteleder: ExpectMeta.NotInDom,
                egenmeldingsdager: {
                    arbeidsgiver: 'Mt.frank Storbyuniversitet Studiestedettilnoenveldigviktige Pekepinnstredet',
                    svar: 'Nei',
                },
            })(page)
        })

        test('should be able to submit form with missing NL but active arbeidsgiver', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 3,
            })(page)

            await filloutArbeidstaker(/Nottinghamshire Missing Narmesteleder/)(page)
            await getRadioInGroup(page)(
                {
                    name: /Er du syk fra flere arbeidsforhold i denne perioden/,
                },
                { name: 'Nei' },
            ).click()

            // Should ask about egenmeldingsdager even though NL is null, but arbeidsforhold is active
            await getRadioInGroup(page)(
                { name: /Brukte du egenmelding hos Nottinghamshire Missing Narmesteleder i perioden/ },
                { name: 'Nei' },
            ).click()

            await expect(page.getByRole('region', { name: 'Se hva som sendes til jobben din' })).toBeVisible()
            await sendSykmelding(page)

            await expectKvittering({
                sendtTil: 'Nottinghamshire Missing Narmesteleder',
                egenmeldingsdager: 'legg til',
            })(page)

            await expectDineSvar({
                arbeidssituasjon: 'Ansatt',
                arbeidsgiver: '110110113',
                narmesteleder: ExpectMeta.NotInDom,
                egenmeldingsdager: {
                    arbeidsgiver: 'Nottinghamshire Missing Narmesteleder',
                    svar: 'Nei',
                },
            })(page)
        })

        test('should show warning if user does not have any arbeidsforhold', async ({ page }) => {
            await gotoScenario('normal', {
                antallArbeidsgivere: 0,
            })(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
            await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }).click()

            await expect(
                page.getByText(
                    /Før du går videre, må du be arbeidsgiveren din om å registrere deg i A-meldingen. Når det er gjort blir det oppdatert her, og du kan sende inn sykmeldingen./,
                ),
            ).toBeVisible()
            await expect(page).toHaveNoViolations()
        })
    })

    test.describe('given previous sykmeldinger', () => {
        test('should collide with 100% sykmelding and NOT show "Legg til egenmeldingsdager"', async ({ page }) => {
            await gotoScenario('buttAgainstGradert')(page)

            await navigateToFirstSykmelding('tidligere', '100%')(page)

            await expect(page.getByText(/Sykmeldingen ble sendt til/)).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).not.toBeVisible()

            await expect(page).toHaveNoViolations()
        })

        test('should not collide with AVVENTENDE sykmeldinger and still show "Legg til egenmeldingsdager"', async ({
            page,
        }) => {
            await gotoScenario('buttAgainstAvventendeSent')(page)

            await navigateToFirstSykmelding('tidligere', '100%')(page)

            await expect(page.getByText(/Sykmeldingen ble sendt til/)).toBeVisible()
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()

            await expect(page).toHaveNoViolations()
        })
    })
})
