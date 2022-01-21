import { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks';

interface CustomProviderOptions {
    initialRouterEntries: string[];
    renderPath: string;
    history?: History;
}

function AllTheProviders({
    children,
    initialRouterEntries,
    renderPath,
    history = createMemoryHistory({
        initialEntries: initialRouterEntries,
    }),
}: PropsWithChildren<CustomProviderOptions>): JSX.Element {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <Router history={history}>
            <Route path={renderPath}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </Route>
        </Router>
    );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'> & CustomProviderOptions) =>
    render(ui, {
        wrapper: (props) => (
            <AllTheProviders
                {...props}
                initialRouterEntries={options?.initialRouterEntries ?? ['/syk/sykmeldinger']}
                renderPath={options?.renderPath ?? '/'}
                history={options?.history}
            />
        ),
        ...options,
    });

const customRenderHook = <TProps, TResult>(
    hook: (props: TProps) => TResult,
    options?: Omit<RenderHookOptions<TProps>, 'wrapper'> & CustomProviderOptions,
): RenderHookResult<TProps, TResult> =>
    renderHook(hook, {
        wrapper: (props) => (
            <AllTheProviders
                {...props}
                initialRouterEntries={options?.initialRouterEntries ?? ['/syk/sykmeldinger']}
                renderPath={options?.renderPath ?? '/'}
                history={options?.history}
            />
        ),
    });

export * from '@testing-library/react';

export { customRender as render, customRenderHook as renderHook };
