import { TextDecoder, TextEncoder } from 'util'

import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'

import * as matchers from '@testing-library/jest-dom/matchers'
import * as axeMatchers from 'vitest-axe/matchers'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

expect.extend(matchers)
expect.extend(axeMatchers)

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

HTMLCanvasElement.prototype.getContext = vi.fn()

mockRouter.useParser(createDynamicRouteParser(['/', '/[sykmeldingId]', '/[sykmeldingId]/kvittering']))

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
    setBreadcrumbs: vi.fn(),
}))
vi.mock('next/router', () => vi.importActual('next-router-mock'))
vi.mock('next/dist/client/router', () => vi.importActual('next-router-mock'))

afterEach(() => {
    cleanup()
})
