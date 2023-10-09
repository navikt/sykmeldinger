export {}

declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toHaveDescriptiveText(descriptiveText?: string): Promise<R>
        }
    }
}
