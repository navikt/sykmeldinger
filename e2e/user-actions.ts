import { Page } from '@playwright/test'

import type { Scenarios } from '../src/server/graphql/mock-db/scenarios'

import { expectNoAxeViolations, getRadioInGroup } from './test-utils'

export function gotoScenario(
    scenario: Scenarios = 'normal',
    options: Partial<{ antallArbeidsgivere: 0 | 1 | 2 | 3 | 4; strengtFortroligAdresse: boolean }> = {
        antallArbeidsgivere: 1,
        strengtFortroligAdresse: false,
    },
) {
    return async (page: Page): Promise<void> => {
        const antallArbeidsgivere = options.antallArbeidsgivere ?? 1
        const strengtFortroligAdresse = options.strengtFortroligAdresse ?? false
        if (scenario == 'normal' && antallArbeidsgivere === 1 && !strengtFortroligAdresse) {
            // Basic scenario
            await page.goto('/')
            return
        }

        const searchParams = new URLSearchParams({
            scenario,
            antallArbeidsgivere: antallArbeidsgivere.toString(),
            strengtFortroligAdresse: strengtFortroligAdresse.toString(),
        })

        await page.goto(`/?${searchParams.toString()}`)
    }
}

export function navigateToFirstSykmelding(type: 'nye' | 'tidligere', variant: '100%' | 'egenmelding') {
    return async (page: Page): Promise<void> => {
        const sectionRegex = type === 'nye' ? /Nye sykmeldinger/i : /Tidligere sykmeldinger/i

        let linkRegexp: RegExp
        switch (variant) {
            case '100%':
                linkRegexp = /Sykmelding 100%/i
                break
            case 'egenmelding':
                linkRegexp = /Egenmelding/i
                break
        }

        await page
            .getByRole('region', { name: sectionRegex })
            .getByRole('link', { name: new RegExp(linkRegexp) })
            .click()
    }
}

export async function opplysingeneStemmer(page: Page): Promise<void> {
    await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
}

export function velgArbeidssituasjon(situasjon: 'ansatt' | 'arbeidsledig' | 'annet') {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: situasjon }).click()
    }
}

export function velgArbeidstaker(arbeidstaker: RegExp) {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)({ name: /Velg arbeidsgiver/i }, { name: arbeidstaker }).click()
    }
}

export function bekreftNarmesteleder(narmesteleder: string, svar: 'Ja' | 'Nei' = 'Ja') {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)(
            { name: new RegExp(`Er det ${narmesteleder} som skal følge deg opp på jobben mens du er syk`, 'i') },
            { name: svar },
        ).click()
    }
}

export async function sendSykmelding(page: Page): Promise<void> {
    await expectNoAxeViolations(page)
    await page.getByRole('button', { name: /Send sykmelding/ }).click()
    await page.waitForURL('**/kvittering')
}

export async function bekreftSykmelding(page: Page): Promise<void> {
    await expectNoAxeViolations(page)
    await page.getByRole('button', { name: /Bekreft sykmelding/ }).click()
    await page.waitForURL('**/kvittering')
}

export function filloutArbeidstaker(arbeidstaker: RegExp): (page: Page) => Promise<void> {
    return async (page: Page): Promise<void> => {
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('ansatt')(page)
        await velgArbeidstaker(arbeidstaker)(page)
    }
}
