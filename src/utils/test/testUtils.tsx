/* eslint-disable no-console */

import { PropsWithChildren, ReactElement } from 'react'
import { render, screen, RenderOptions, Screen } from '@testing-library/react'
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import { MockedProvider, MockedResponse, MockLink } from '@apollo/client/testing'
import { ApolloLink, Cache, InMemoryCache } from '@apollo/client'
import open from 'open'
import { onError } from '@apollo/client/link/error'

import * as customQueries from './customQueries'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[]
    readonly mocks?: MockedResponse[]
}

const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error('[GraphQL error]:' + `Message: ${message},` + `Location: ${locations},` + `Path: ${path}`),
        )
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`)
    }
})

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): JSX.Element {
    const cache = new InMemoryCache()
    initialState?.forEach((it) => cache.writeQuery(it))

    const mockLink = new MockLink(mocks ?? [])
    const link = ApolloLink.from([errorLoggingLink, mockLink])

    return (
        <MockedProvider link={link} mocks={mocks}>
            {children}
        </MockedProvider>
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
): RenderHookResult<TProps, TResult> => {
    const { initialState, mocks, ...renderOptions } = options

    return renderHook(hook, {
        wrapper: (props) => <AllTheProviders {...props} initialState={initialState} mocks={mocks} />,
        ...renderOptions,
    })
}

export async function openPlayground(screen: Screen): Promise<void> {
    await open(screen.logTestingPlaygroundURL())
}

export * from '@testing-library/react'

const customScreen = {
    ...screen,
    getByGroup: customQueries.getByGroup.bind(null, screen)(),
    findByGroup: customQueries.findByGroup.bind(null, screen)(),
}

export { customScreen as screen }
export { customRender as render, customRenderHook as renderHook }
