import test, { expect } from '@playwright/test'

import { gotoScenario, navigateToFirstSykmelding } from './user-actions'

test.describe('Guide panel', () => {
    test('should show guidepanel about egenmeldt', async ({ page }) => {
        await gotoScenario('egenmeldt', {
            erUtenforVentetid: false,
            oppfolgingsdato: '2020-04-01',
        })(page)
        await navigateToFirstSykmelding('nye', 'egenmelding')(page)

        await expect(
            page.getByText(
                'Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger fra egenmeldingen under.',
            ),
        ).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should show guidepanel if user is over 70 years old', async ({ page }) => {
        await gotoScenario('overSytti')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByText('Når du har passert 70 år, har du ikke lenger rett til sykepenger.')).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should show guidepanel if sykmelding is under 20%', async ({ page }) => {
        await gotoScenario('under20Prosent')(page)
        await navigateToFirstSykmelding('nye', 'papirsykmelding')(page)

        await expect(
            page.getByText(
                'Denne sykmeldingen viser at du er 14 prosent sykmeldt. Hvis du er under 20 prosent sykmeldt, har du ikke rett til sykepenger.',
            ),
        ).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test.describe('Merknadtype', () => {
        test('should show guidepanel when sykmelding has merknad DELVIS_GODKJENT', async ({ page }) => {
            await gotoScenario('delvisGodkjentTilbakedatering')(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await expect(page.getByRole('heading', { name: 'Sykmeldingen din er delvis godkjent' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Bekreft sykmelding ' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show guidepanel when sykmelding has merknad TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER', async ({
            page,
        }) => {
            await gotoScenario('tilbakedateringKreverMerInfo')(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await expect(page.getByRole('heading', { name: 'Behov for mer opplysninger' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Bekreft sykmelding ' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show guidepanel in open sykmelding with merknad UNDER_BEHANDLING', async ({ page }) => {
            await gotoScenario('harUnderBehandlingUsent')(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            await expect(
                page.getByText(
                    'Sykmeldingen din er skrevet tilbake i tid, og NAV må derfor vurdere om det er en gyldig grunn til at sykmeldingen starter før du var i kontakt med legen.',
                ),
            ).toBeVisible()
            await expect(page.getByRole('button', { name: 'Bekreft sykmelding' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })

        test('should show guidepanel in sent sykmelding for under (manuell) behandling', async ({ page }) => {
            await gotoScenario('harUnderBehandling')(page)
            await navigateToFirstSykmelding('under-behandling', '100%')(page)

            await expect(
                page.getByText(
                    'Sykmeldingen din er skrevet tilbake i tid, og NAV må derfor vurdere om det er en gyldig grunn til at sykmeldingen starter før du var i kontakt med legen.',
                ),
            ).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Sykmeldingen er sendt' })).toBeVisible()
            await expect(page).toHaveNoViolations()
        })
    })
})

test.describe('Alert', () => {
    test('should how alert whem sykmelding has status UTGATT', async ({ page }) => {
        await gotoScenario('utgatt')(page)
        await navigateToFirstSykmelding('tidligere', '100%')(page)

        await expect(page.getByRole('heading', { name: 'Sykmeldingen er utgått' })).toBeVisible()
        await expect(page).toHaveNoViolations()
    })
})
