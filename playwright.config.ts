import { defineConfig, devices } from '@playwright/test'
import { PlaywrightTestConfig } from 'playwright/types/test'

const PORT = process.env.PORT || 3000

type OptionsType = { baseURL: string; server: PlaywrightTestConfig['webServer'] }
const opts: OptionsType =
    process.env.CI || process.env.FAST
        ? // Github Actions runs server in a services image
          {
              baseURL: `http://localhost:${PORT}`,
              server: {
                  command: 'yarn start:e2e',
                  url: `http://localhost:${PORT}`,
                  timeout: 120 * 1000,
                  reuseExistingServer: !process.env.CI,
              },
          }
        : // Local dev server
          {
              baseURL: `http://localhost:${PORT}`,
              server: {
                  command: 'NEXT_PUBLIC_IS_E2E=true yarn dev',
                  url: `http://localhost:${PORT}`,
                  timeout: 120 * 1000,
                  reuseExistingServer: !process.env.CI,
                  env: {
                      NEXT_PUBLIC_IS_E2E: 'true',
                  },
              },
          }

export default defineConfig({
    testDir: './e2e',
    expect: {
        timeout: 10 * 1000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: opts.baseURL,
        trace: 'on-first-retry',
    },
    webServer: opts.server,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
        ...(!process.env.CI
            ? [
                  {
                      name: 'firefox',
                      use: { ...devices['Desktop Firefox'] },
                  },
                  {
                      name: 'webkit',
                      use: { ...devices['Desktop Safari'] },
                  },
              ]
            : []),
    ],
})
