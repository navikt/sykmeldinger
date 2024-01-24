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
    arbeidssituasjon:
        | 'Ansatt'
        | 'Arbeidsledig'
        | 'Annet'
        | 'Fisker'
        | 'Frilanser'
        | 'Jordbruker'
        | 'Permittert'
        | 'Selvstendig næringsdrivende'
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
    selvstendig?: {
        egenmeldingsperioder: 'Nei' | string[] | ExpectMeta.NotInDom
        forsikring: 'Ja' | 'Nei' | ExpectMeta.NotInDom
    }
    fisker?:
        | {
              blad: 'A' | 'B'
              lottEllerHyre: 'Lott' | 'Hyre' | 'Begge'
          }
        | ExpectMeta.NotInDom
}) {
    return async (page: Page): Promise<void> => {
        const region = page.getByRole('region', { name: /Dine svar/i })
        await region.click()

        // These two questions are always asked and answered
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

        if (svar.selvstendig) {
            if (svar.selvstendig.egenmeldingsperioder === ExpectMeta.NotInDom) {
                await expect(
                    getInfoItem('Brukte du egenmelding eller noen annen sykmelding før denne datoen?')(page),
                ).not.toBeVisible()
            } else if (svar.selvstendig.egenmeldingsperioder === 'Nei') {
                await expect(
                    getInfoItem('Brukte du egenmelding eller noen annen sykmelding før denne datoen?')(page),
                ).toHaveText(/Nei/)
            } else {
                await expect(
                    getInfoItem('Brukte du egenmelding eller noen annen sykmelding før denne datoen?')(page),
                ).toHaveText(/Ja/)
                await expect(getInfoItem(/Hvilke dager var du borte fra jobb før/)(page)).toHaveText(
                    new RegExp(svar.selvstendig.egenmeldingsperioder.join(''), 'i'),
                )
            }

            if (svar.selvstendig.forsikring === ExpectMeta.NotInDom) {
                await expect(
                    getInfoItem('Har du forsikring som gjelder for de første 16 dagene av sykefraværet?')(page),
                ).not.toBeVisible()
            } else {
                await expect(
                    getInfoItem('Har du forsikring som gjelder for de første 16 dagene av sykefraværet?')(page),
                ).toHaveText(new RegExp(svar.selvstendig.forsikring, 'i'))
            }
        }

        if (svar.fisker) {
            if (svar.fisker === ExpectMeta.NotInDom) {
                await expect(getInfoItem('Velg blad')(page)).not.toBeVisible()
            } else {
                await expect(getInfoItem('Velg blad')(page)).toHaveText(new RegExp(`Blad ${svar.fisker.blad}`, 'i'))
                await expect(getInfoItem('Mottar du lott eller er du på hyre?')(page)).toHaveText(
                    new RegExp(svar.fisker.lottEllerHyre, 'i'),
                )
            }
        }
    }
}

function getInfoItem(name: RegExp | string) {
    return (page: Page | Locator): Locator => page.getByRole('heading', { name }).locator('..')
}
