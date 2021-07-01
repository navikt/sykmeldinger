import { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

interface CustomProviderOptions {
    initialRouterEntries: string[];
}

function AllTheProviders({ children, initialRouterEntries }: PropsWithChildren<CustomProviderOptions>): JSX.Element {
    const history = createMemoryHistory({
        initialEntries: initialRouterEntries,
    });
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <Router history={history}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Router>
    );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'> & CustomProviderOptions) =>
    render(ui, {
        wrapper: (props) => (
            <AllTheProviders {...props} initialRouterEntries={options?.initialRouterEntries ?? ['/syk/sykmeldinger']} />
        ),
        ...options,
    });

export * from '@testing-library/react';

export { customRender as render };
