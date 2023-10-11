import { expect, Locator, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

expect.extend({
    async toHaveDescriptiveText(locator: Locator, expectedText?: string) {
        const describedId = await locator.getAttribute('aria-describedby')
        if (describedId == null) {
            return {
                message: () => `Element is missing "aria-describedby"`,
                pass: false,
            }
        }

        const descriptiveText = await locator.page().locator(`#${describedId}`).textContent()
        expect(descriptiveText, { message: 'Descriptive text does not match' }).toEqual(expectedText)

        return {
            message: () => 'passed',
            pass: true,
        }
    },
    async toHaveNoViolations(page: Page) {
        const results = await new AxeBuilder({ page }).analyze()
        expect(results.violations, { message: 'Found axe violations' }).toEqual([])

        return {
            message: () => 'passed',
            pass: true,
        }
    },
})
