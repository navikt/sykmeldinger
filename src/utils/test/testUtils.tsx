import { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks';

function AllTheProviders({ children }: PropsWithChildren<unknown>): JSX.Element {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): ReturnType<typeof render> =>
    render(ui, {
        wrapper: (props) => <AllTheProviders {...props} />,
        ...options,
    });

const customRenderHook = <TProps, TResult>(
    hook: (props: TProps) => TResult,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: Omit<RenderHookOptions<TProps>, 'wrapper'>,
): RenderHookResult<TProps, TResult> =>
    renderHook(hook, {
        wrapper: (props) => <AllTheProviders {...props} />,
    });

export * from '@testing-library/react';

export { customRender as render, customRenderHook as renderHook };
