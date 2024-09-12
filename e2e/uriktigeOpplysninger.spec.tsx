import { expect, Page, test } from '@playwright/test'

import { UriktigeOpplysningerType } from 'queries'

import {
    bekreftNarmesteleder,
    gotoScenario,
    navigateToFirstSykmelding,
    sendSykmelding,
    velgArbeidssituasjon,
    velgArbeidstaker,
} from './user-actions'
import { getCheckboxInGroup, getRadioInGroup } from './test-utils'
import { expectDineSvar, expectKvittering } from './user-expects'

test.describe('Uriktige opplysninger', () => {
    test('should show error message when periode is wrong', async ({ page }) => {
        await opplysningNotCorrect('Periode')(page)
        await expectNotUsable(page)
        await expect(page).toHaveNoViolations()
    })

    test('should show error message when sykmeldingsgrad is to low', async ({ page }) => {
        await opplysningNotCorrect('Sykmeldingsgraden er for lav')(page)
        await expectNotUsable(page)
        await expect(page).toHaveNoViolations()
    })

    test('should be able to continue when sykmeldingsgrad is too high', async ({ page }) => {
        await opplysningNotCorrect('Sykmeldingsgraden er for høy')(page)
        await expectUseable(
            'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
        )(page)
        await expect(page).toHaveNoViolations()
    })

    test('should be able to continue when arbeidsgiver is wrong', async ({ page }) => {
        await opplysningNotCorrect('Arbeidsgiver')(page)
        await expectUseable(
            'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.',
        )(page)
        await expect(page).toHaveNoViolations()
    })

    test('should be able to continue when diagnose is wrong', async ({ page }) => {
        await opplysningNotCorrect('Diagnose')(page)
        await expectUseable(
            'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
        )(page)
        await expect(page).toHaveNoViolations()
    })

    test('should be able to continue when andre opplysninger is wrong', async ({ page }) => {
        await opplysningNotCorrect('Andre opplysninger')(page)
        await expectUseable(
            'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
        )(page)
        await expect(page).toHaveNoViolations()
    })

    test('should not show Din arbeidssituasjon if reason for uriktigeOpplysninger is not checked', async ({ page }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }).click()

        await expect(page.getByText('Hvilken arbeidssituasjon gjelder sykmeldingen for?')).not.toBeVisible()
        await expect(page.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeVisible()

        await expect(page).toHaveNoViolations()
    })

    test('should show multiple info text and be able to send sykmelding if multiple reasons are checked', async ({
        page,
    }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }).click()
        await opplysningNotCorrect('Andre opplysninger', 'Diagnose')(page)
        await expect(
            page.getByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
            ),
        ).toBeVisible()
        await expect(
            page.getByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
            ),
        ).toBeVisible()
        await expect(page.getByText('Hvilken arbeidssituasjon gjelder sykmeldingen for?')).toBeVisible()
        await expect(page.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeVisible()
        await velgArbeidssituasjon('ansatt')(page)
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
            stemmer: 'Nei',
            uriktige: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER, UriktigeOpplysningerType.DIAGNOSE],
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

    test('should not show info text when uriktigeOpplysninger has value and then erOpplysningeneRiktige changes to Ja', async ({
        page,
    }) => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }).click()
        await opplysningNotCorrect('Sykmeldingsgraden er for høy', 'Diagnose')(page)
        await expect(
            page.getByText(
                'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
            ),
        ).toBeVisible()
        await expect(
            page.getByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
            ),
        ).toBeVisible()
        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
        await expect(
            page.getByText(
                'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
            ),
        ).not.toBeVisible()
        await expect(
            page.getByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
            ),
        ).not.toBeVisible()
    })
})

function opplysningNotCorrect(
    ...whatsNotCorrect: (
        | 'Periode'
        | `Sykmeldingsgraden er for ${'lav' | 'høy'}`
        | 'Arbeidsgiver'
        | 'Diagnose'
        | 'Andre opplysninger'
    )[]
) {
    return async (page: Page): Promise<void> => {
        await gotoScenario('normal')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)
        await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }).click()
        for (const it of whatsNotCorrect) {
            await getCheckboxInGroup(page)({ name: /Hvilke opplysninger stemmer ikke?/i }, { name: it }).click()
        }
    }
}

async function expectNotUsable(page: Page): Promise<void> {
    await expect(page.getByRole('heading', { name: 'Du kan ikke bruke denne sykmeldingen' })).toBeVisible()
    await expect(page.getByText('Hvilken arbeidssituasjon gjelder sykmeldingen for?')).not.toBeVisible()
    await expect(page.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).not.toBeVisible()
}

function expectUseable(explanationText: string) {
    return async (page: Page): Promise<void> => {
        await expect(page.getByText(explanationText)).toBeVisible()
        await expect(page.getByText('Hvilken arbeidssituasjon gjelder sykmeldingen for?')).toBeVisible()
        await expect(page.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeVisible()
    }
}
