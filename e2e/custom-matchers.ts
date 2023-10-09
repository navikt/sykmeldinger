import { expect, Locator } from '@playwright/test'

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
})
