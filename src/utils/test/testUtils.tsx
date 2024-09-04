import { PropsWithChildren, ReactElement } from 'react'
import {
    render,
    renderHook,
    screen,
    RenderOptions,
    Screen,
    RenderHookOptions,
    RenderHookResult,
} from '@testing-library/react'
import { MockedProvider, MockedResponse, MockLink } from '@apollo/client/testing'
import { ApolloLink, Cache } from '@apollo/client'
import open from 'open'
import { onError } from '@apollo/client/link/error'
import { logger } from '@navikt/next-logger'
import { configureAxe } from 'vitest-axe'
import { IToggle } from '@unleash/nextjs'

import { FlagProvider } from '../../toggles/context'
import { createInMemoryCache } from '../../fetching/apollo'

import * as customQueries from './customQueries'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[]
    readonly mocks?: MockedResponse[]
}

const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.dontLog) {
                logger.error('[GraphQL error]:' + `Message: ${message},` + `Location: ${locations},` + `Path: ${path}`)
            }
        })
    }

    if (networkError) {
        logger.error(`[Network error]: ${networkError}`)
    }
})

const testToggles: IToggle[] = [
    {
        name: 'SYKMELDINGER_FLEXJAR_KVITTERING',
        variant: { name: 'default', enabled: false },
        impressionData: false,
        enabled: false,
    },
]

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): ReactElement {
    const cache = createInMemoryCache()

    initialState?.forEach((it) => cache.writeQuery(it))

    const mockLink = new MockLink(mocks ?? [])
    const link = ApolloLink.from([errorLoggingLink, mockLink])

    return (
        <FlagProvider toggles={testToggles}>
            <MockedProvider link={link} mocks={mocks} cache={cache}>
                {children}
            </MockedProvider>
        </FlagProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options: Omit<RenderOptions, 'queries'> & ProviderProps = {},
): ReturnType<typeof render> => {
    const { initialState, mocks, ...renderOptions } = options

    return render(ui, {
        wrapper: (props) => <AllTheProviders {...props} initialState={initialState} mocks={mocks} />,
        ...renderOptions,
    })
}

const customRenderHook = <TProps, TResult>(
    hook: (props: TProps) => TResult,
    options: Omit<RenderHookOptions<TProps>, 'wrapper'> & ProviderProps = {},
): RenderHookResult<TResult, TProps> => {
    const { initialState, mocks, ...renderOptions } = options

    return renderHook(hook, {
        wrapper: (props) => <AllTheProviders {...props} initialState={initialState} mocks={mocks} />,
        ...renderOptions,
    })
}

export async function openPlayground(screen: Screen): Promise<void> {
    await open(screen.logTestingPlaygroundURL())
}

const axe = configureAxe({
    rules: {
        // The react-ds datepicker uses aria-controls to refer to a popover that doesn't exist, axe doesn't like this, so we have to disable the rule for now.
        'aria-valid-attr-value': { enabled: false },
    },
})

export * from '@testing-library/react'

const customScreen = {
    ...screen,
    getRadioInGroup: customQueries.getRadioInGroup(screen)('radio'),
    getCheckboxInGroup: customQueries.getRadioInGroup(screen)('checkbox'),
    findRadioInGroup: customQueries.findRadioInGroup(screen),
    openPlayground: () => openPlayground(screen),
}

export { axe as axe }
export { customScreen as screen }
export { customRender as render, customRenderHook as renderHook }
