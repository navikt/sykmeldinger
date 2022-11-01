import { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions, Screen } from '@testing-library/react'
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { Cache, InMemoryCache } from '@apollo/client'
import open from 'open'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[]
    readonly mocks?: MockedResponse[]
}

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): JSX.Element {
    const cache = new InMemoryCache()
    initialState?.forEach((it) => cache.writeQuery(it))

    return <MockedProvider mocks={mocks}>{children}</MockedProvider>
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

export { customRender as render, customRenderHook as renderHook }
