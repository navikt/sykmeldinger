/* eslint-disable react/display-name */

import 'next'
import '@testing-library/jest-dom/extend-expect'

import { TextDecoder, TextEncoder } from 'util'

import { toHaveNoViolations } from 'jest-axe'
import { Modal } from '@navikt/ds-react'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'
import pino from 'pino'
import pretty from 'pino-pretty'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))
jest.mock('@navikt/next-auth-wonderwall', () => ({
    validateTokenXToken: () => Promise.resolve(true),
    isInvalidTokenSet: () => false,
}))
jest.mock('@navikt/next-logger', () => ({
    logger: pino(pretty({ sync: true, minimumLevel: 'error' })),
}))

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

Modal.setAppElement(document.createElement('div'))

mockRouter.useParser(
    createDynamicRouteParser(['/', '/[sykmeldingId]', '/[sykmeldingId]/kvittering', '/[sykmeldingId]/bekreftAvvist']),
)

jest.spyOn(window, 'scrollTo').mockImplementation(() => void 0)
jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        publicPath: '/fake/basepath',
        runtimeEnv: 'test',
        MIN_SIDE_ROOT: '/test-min-side',
        SYKEFRAVAER_ROOT: '/test-ditt-sykefravaer',
        DISPLAY_EGENMELDING: 'true',
    },
}))

// All dynamically loaded components are replaced with a dummy component. These are typically
// components that rely on localStorage and can't be SSR'd.
jest.mock('next/dynamic', () => () => () => <div>Dummy dynamic component</div>)

process.env.DEBUG_PRINT_LIMIT = '100000'
