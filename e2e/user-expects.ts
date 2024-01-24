import { expect, Locator, Page } from '@playwright/test'

import { UriktigeOpplysningerType } from 'queries'

import { raise } from '../src/utils/ts-utils'

export enum ExpectMeta {
    NotInDom = 'NOT_IN_DOM',
}

export function expectKvittering(opts: {
    sendtTil: 'NAV' | string
    egenmeldingsdager: ExpectMeta.NotInDom | 'legg til' | 'endre'
}) {
    return async (page: Page): Promise<void> => {
        await page.waitForURL('**/kvittering')
        await expect(page.getByRole('button', { name: /Ferdig/ })).toBeVisible()

        if (opts.sendtTil === 'NAV') {
            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble sendt til NAV' })).toBeVisible()
        } else {
            await expect(
                page.getByRole('heading', { name: new RegExp(`Sykmeldingen ble sendt til ${opts.sendtTil}`) }),
            ).toBeVisible()
        }

        if (opts.egenmeldingsdager === ExpectMeta.NotInDom) {
            await expect(page.getByRole('button', { name: /^(Endre|Legg til) egenmeldingsdager/ })).not.toBeVisible()
        } else if (opts.egenmeldingsdager === 'legg til') {
            await expect(page.getByRole('button', { name: /Legg til egenmeldingsdager/ })).toBeVisible()
        } else {
            await expect(page.getByRole('button', { name: /Endre egenmeldingsdager/ })).toBeVisible()
        }
    }
}

export function expectDineSvar(svar: {
    stemmer?: 'Ja' | 'Nei'
    uriktige?: UriktigeOpplysningerType[]
    arbeidssituasjon: 'Ansatt' | 'Arbeidsledig' | 'Annet'
    arbeidsgiver?: string
    narmesteleder?:
        | {
              navn: string
              svar: 'Ja' | 'Nei'
          }
        | ExpectMeta.NotInDom
    egenmeldingsdager?:
        | {
              arbeidsgiver: string
              svar: 'Nei'
          }
        | {
              arbeidsgiver: string
              antallDager: number
          }
        | ExpectMeta.NotInDom
}) {
    return async (page: Page): Promise<void> => {
        const region = page.getByRole('region', { name: /Dine svar/i })

        await expect(region).toBeVisible()
        await region.scrollIntoViewIfNeeded()

        // Expand ExpansionCard
        // await region.getByRole('button', { name: 'Vis mer' }).click()
        await region.click()

        await expect(getInfoItem('Stemmer opplysningene?')(region)).toHaveText(new RegExp(svar.stemmer ?? 'Ja', 'i'))
        await expect(getInfoItem('Jeg er sykmeldt som')(region)).toHaveText(new RegExp(svar.arbeidssituasjon, 'i'))
        if (svar.arbeidsgiver) {
            await expect(getInfoItem('Velg arbeidsgiver')(region)).toHaveText(new RegExp(svar.arbeidsgiver, 'i'))
        }
        if (svar.narmesteleder != null && typeof svar.narmesteleder !== 'string') {
            await expect(
                getInfoItem(
                    new RegExp(`Er det ${svar.narmesteleder.navn} som skal følge deg opp på jobben mens du er syk?`),
                )(region),
            ).toHaveText(new RegExp(svar.narmesteleder.svar, 'i'))
        }
        if (svar.narmesteleder === ExpectMeta.NotInDom) {
            await expect(
                getInfoItem(new RegExp(`som skal følge deg opp på jobben mens du er syk?`))(region),
            ).not.toBeVisible()
        }
        if (svar.egenmeldingsdager) {
            if (svar.egenmeldingsdager === ExpectMeta.NotInDom) {
                await expect(getInfoItem(new RegExp(`Brukte du egenmelding hos`))(region)).not.toBeVisible()
            } else if ('svar' in svar.egenmeldingsdager && svar.egenmeldingsdager.svar === 'Nei') {
                await expect(
                    getInfoItem(new RegExp(`Brukte du egenmelding hos ${svar.egenmeldingsdager.arbeidsgiver}`, 'i'))(
                        region,
                    ),
                ).toHaveText(/Nei/i)
            } else if ('antallDager' in svar.egenmeldingsdager) {
                await expect(
                    getInfoItem(new RegExp(`Brukte du egenmelding hos ${svar.egenmeldingsdager.arbeidsgiver}`, 'i'))(
                        region,
                    ),
                ).toHaveText(/Ja/i)
                await expect(getInfoItem('Velg dagene du brukte egenmelding')(region)).toHaveText(
                    new RegExp(`(${svar.egenmeldingsdager.antallDager} dager)`, 'i'),
                )
            } else {
                raise('Illegal state: Needs to be implemented')
            }
        }
    }
}

function getInfoItem(name: RegExp | string) {
    return (page: Page | Locator): Locator => page.getByRole('heading', { name }).locator('..')
}
