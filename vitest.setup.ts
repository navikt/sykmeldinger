import { TextDecoder, TextEncoder } from 'util'

import 'vitest-axe/extend-expect'

// @ts-expect-error Missing types
import matchers from '@testing-library/jest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyGlobal = global as any

dirtyGlobal.innerWidth = 766
dirtyGlobal.TextEncoder = TextEncoder
dirtyGlobal.TextDecoder = TextDecoder
dirtyGlobal.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))
dirtyGlobal.scrollTo = vi.fn().mockImplementation(() => 0)

// @ts-expect-error Difficult to type :))
HTMLCanvasElement.prototype.getContext = vi.fn()

vi.mock(
    'next/config',
    vi.fn(() => ({
        default: () => ({
            publicRuntimeConfig: {
                publicPath: '/fake/basepath',
                runtimeEnv: 'test',
                MIN_SIDE_ROOT: '/test-min-side',
                SYKEFRAVAER_ROOT: '/test-ditt-sykefravaer',
                DISPLAY_EGENMELDING: 'true',
            },
        }),
    })),
)

mockRouter.useParser(
    createDynamicRouteParser([
        '/',
        '/[sykmeldingId]',
        '/[sykmeldingId]/kvittering',
        '/[sykmeldingId]/endre-egenmeldingsdager',
    ]),
)

vi.mock('next/router', () => vi.importActual('next-router-mock'))
vi.mock('next/dist/client/router', () => vi.importActual('next-router-mock'))

afterEach(() => {
    cleanup()
})