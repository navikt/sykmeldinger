import { test, expect } from '@playwright/test'

import { getRadioInGroup } from './test-utils'
import { gotoScenario, navigateToFirstSykmelding } from './user-actions'

test.describe('Papir sykmelding', () => {
    test('should show information if papirsykmelding is already passed on', async ({ page }) => {
        await gotoScenario('papirsykmelding')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByRole('heading', { name: 'Papirsykmelding', level: 1 })).toBeVisible()
        await getRadioInGroup(page)({ name: /Har du allerede gitt papirsykmeldingen videre?/i }, { name: 'Ja' }).click()
        await expect(
            page.getByText(
                'Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her, erstatter papiret.',
            ),
        ).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should show information if papirsykmelding is not passed on', async ({ page }) => {
        await gotoScenario('papirsykmelding')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByRole('heading', { name: 'Papirsykmelding', level: 1 })).toBeVisible()
        await getRadioInGroup(page)(
            { name: /Har du allerede gitt papirsykmeldingen videre?/i },
            { name: 'Nei' },
        ).click()

        await expect(page.getByText('Da kan du sende sykmeldingen herfra')).toBeVisible()
        await expect(page).toHaveNoViolations()
    })

    test('should avbryte papirsykmelding', async ({ page }) => {
        await gotoScenario('papirsykmelding')(page)
        await navigateToFirstSykmelding('nye', '100%')(page)

        await expect(page.getByRole('heading', { name: 'Papirsykmelding', level: 1 })).toBeVisible()
        await getRadioInGroup(page)({ name: /Har du allerede gitt papirsykmeldingen videre?/i }, { name: 'Ja' }).click()
        await page.getByRole('button', { name: 'Avbryt sykmeldingen' }).click()

        await expect(page.getByText('Sykmeldingen ble avbrutt av deg')).toBeVisible()
    })

    test.describe('Utenlandsk sykmelding', () => {
        test('Should show country for utenlandsk sykmelding', async ({ page }) => {
            await gotoScenario('utenlandsk')(page)
            await navigateToFirstSykmelding('nye', '100%')(page)

            // Avbryt the first one so we can get to the second one :)))) (could make specific scenario ofc)
            await page.getByRole('button', { name: 'Jeg vil avbryte sykmeldingen' }).click()
            await page.getByRole('button', { name: 'Ja, jeg er sikker' }).click()
            await expect(page.getByRole('heading', { name: 'Sykmeldingen ble avbrutt av deg' })).toBeVisible()

            // The second unsent one is utenlansk and papir
            await page.goBack()
            await navigateToFirstSykmelding('nye', '100%')(page)

            const annenInfoSection = page.getByRole('region', { name: 'Annen info' })
            await expect(
                annenInfoSection.getByRole('heading', { name: 'Landet sykmeldingen ble skrevet' }),
            ).toBeVisible()
            await expect(annenInfoSection.getByText('SE', { exact: true })).toBeVisible()
        })
    })
})
