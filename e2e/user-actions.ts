import { expect, Page } from '@playwright/test'

import type { Scenarios } from '../src/server/graphql/mock-db/scenarios'

import { getRadioInGroup } from './test-utils'

export function gotoScenario(
    scenario: Scenarios = 'normal',
    options: Partial<{
        antallArbeidsgivere: 0 | 1 | 2 | 3 | 4
        erUtenforVentetid: boolean
        oppfolgingsdato: string | null
    }> = {
        antallArbeidsgivere: 1,
        erUtenforVentetid: false,
    },
) {
    return async (page: Page): Promise<void> => {
        const antallArbeidsgivere = options.antallArbeidsgivere ?? 1
        const erUtenforVentetid = options.erUtenforVentetid ?? false
        const oppfolgingsdato = options.oppfolgingsdato ?? null

        if (scenario == 'normal' && antallArbeidsgivere === 1 && !erUtenforVentetid && oppfolgingsdato == null) {
            // Basic scenario
            await page.goto('/')
            return
        }

        const searchParams = new URLSearchParams({
            scenario,
            antallArbeidsgivere: antallArbeidsgivere.toString(),
            utenforVentetid: erUtenforVentetid.toString(),
            oppfolgingsdato: oppfolgingsdato ?? '',
        })

        await page.goto(`/?${searchParams.toString()}`)
    }
}

export async function gotoRoot(page: Page): Promise<void> {
    await page.goto(`/`)
}

export function navigateToFirstSykmelding(type: 'nye' | 'tidligere', variant: '100%' | 'egenmelding') {
    return async (page: Page): Promise<void> => {
        const sectionRegex = type === 'nye' ? /Nye sykmeldinger/i : /Tidligere sykmeldinger/i

        let linkRegexp: RegExp
        switch (variant) {
            case '100%':
                linkRegexp = type === 'nye' ? /Sykmelding 100%/i : /100% sykmeldt/i
                break
            case 'egenmelding':
                linkRegexp = /Egenmelding/i
                break
        }

        await page
            .getByRole('region', { name: sectionRegex })
            .getByRole('link', { name: new RegExp(linkRegexp) })
            .first()
            .click()
    }
}

export async function opplysingeneStemmer(page: Page): Promise<void> {
    await getRadioInGroup(page)({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }).click()
}

export function velgArbeidssituasjon(situasjon: 'ansatt' | 'arbeidsledig' | 'annet' | 'fisker' | 'frilanser') {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)({ name: /Jeg er sykmeldt som/i }, { name: situasjon }).click()
    }
}

export function velgArbeidstaker(arbeidstaker: RegExp) {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)({ name: /Velg arbeidsgiver/i }, { name: arbeidstaker }).click()
    }
}

export function velgForsikring(svar: 'Ja' | 'Nei') {
    return async (page: Page): Promise<void> => {
        await getRadioInGroup(page)(
            { name: /Har du forsikring som gjelder for de første 16 dagene av sykefraværet?/i },
            { name: svar },
        ).click()
    }
}

export function frilanserEgenmeldingsperioder(
    svar:
        | 'Nei'
        | {
              fom: string
              tom: string
          }[],
) {
    return async (page: Page): Promise<void> => {
        const jaEllerNei = Array.isArray(svar) ? 'Ja' : 'Nei'
        await getRadioInGroup(page)(
            { name: /Brukte du egenmelding eller noen annen sykmelding før denne datoen?/i },
            { name: jaEllerNei },
        ).click()

        if (Array.isArray(svar)) {
            let index = 0
            for (const { fom, tom } of svar) {
                await page.getByRole('textbox', { name: 'Fra og med' }).nth(index).fill(fom)
                await page.getByRole('textbox', { name: 'Til og med' }).nth(index).fill(tom)
                if (index < svar.length - 1) {
                    await page.getByRole('button', { name: 'Legg til' }).nth(0).click()
                }
                index++
            }
        }
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
    await expect(page).toHaveNoViolations()
    await page.getByRole('button', { name: /Send sykmelding/ }).click()
    await page.waitForURL('**/kvittering')
}

export async function bekreftSykmelding(page: Page): Promise<void> {
    await expect(page).toHaveNoViolations()
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

export function fillOutFisker(
    blad: `Blad ${'A' | 'B'}`,
    lott: 'Lott' | 'Hyre' | 'Både lott og hyre',
): (page: Page) => Promise<void> {
    return async (page: Page): Promise<void> => {
        await navigateToFirstSykmelding('nye', '100%')(page)
        await opplysingeneStemmer(page)
        await velgArbeidssituasjon('fisker')(page)
        await getRadioInGroup(page)({ name: /Velg blad/i }, { name: blad }).click()
        await getRadioInGroup(page)(
            { name: /Mottar du lott eller er du på hyre?/i },
            { name: lott, exact: true },
        ).click()
    }
}
