import { TextDecoder, TextEncoder } from 'util'

import 'vitest-axe/extend-expect'
import 'vitest-dom/extend-expect'

import * as matchers from 'vitest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyGlobal = global as any

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

mockRouter.useParser(
    createDynamicRouteParser([
        '/',
        '/[sykmeldingId]',
        '/[sykmeldingId]/kvittering',
        '/[sykmeldingId]/endre-egenmeldingsdager',
    ]),
)

vi.mock('@navikt/nav-dekoratoren-moduler')
vi.mock('next/router', () => vi.importActual('next-router-mock'))
vi.mock('next/dist/client/router', () => vi.importActual('next-router-mock'))

afterEach(() => {
    cleanup()
})
