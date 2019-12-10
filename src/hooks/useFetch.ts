import { useCallback, useMemo, useState } from 'react';

export enum FetchStatus {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED',
}

export interface FetchState<D = {}> {
    status: FetchStatus;
    error: any;
    data: D | null;
    httpCode: number;
}

export interface FetchStateWithData<D = {}> extends FetchState<D> {
    data: D;
}

export const isAnyNotStartedOrPending = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => isNotStartedOrPending(f));
    }
    return isNotStartedOrPending(fetch);
};

export const isAnyPending = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => isPending(f));
    }
    return isPending(fetch);
};

export const hasAnyFailed = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => hasFailed(f));
    }
    return hasFailed(fetch);
};

export const hasAny401 = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => has401(f));
    }
    return has401(fetch);
};

export const isNotStarted = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED;
};

export const isNotStartedOrPending = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED || fetch.status === FetchStatus.PENDING;
};

export const isPending = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.PENDING;
};

export const hasFinished = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.FINISHED;
};

export const hasFailed = (fetch: FetchState): boolean => {
    return fetch.error != null || fetch.httpCode >= 400;
};

export const has401 = (fetch: FetchState): boolean => {
    return fetch.httpCode === 401;
};

export const hasData = <D = {}>(fetch: FetchState<D>): fetch is FetchStateWithData<D> => {
    return fetch.data != null;
};

export interface Fetch<D = any, FP = any> extends FetchState<D> {
    fetch: (url: string, request?: RequestInit, onFinished?: (fetchState: FetchState<D>) => void) => void;
    reset: () => void;
}

const createInitialFetchState = (): FetchState<any> => ({
    status: FetchStatus.NOT_STARTED,
    error: null,
    data: null,
    httpCode: -1,
});

const createPendingFetchState = (): FetchState<any> => ({
    status: FetchStatus.PENDING,
    error: null,
    data: null,
    httpCode: -1,
});

const createFinishedFetchState = <D = {}>(data: D | null, error: any, httpCode: number): FetchState<any> => ({
    status: FetchStatus.FINISHED,
    error,
    data: data,
    httpCode,
});

const useFetch = <D = {}>(): Fetch<D> => {
    const [fetchState, setFetchState] = useState<FetchState<D>>(createInitialFetchState());

    const apiFetch = (url: string, request?: RequestInit, onFinished?: (fetchState: FetchState<D>) => void) => {
        setFetchState(createPendingFetchState());

        fetch(url, request)
            .then(async res => {
                const httpCode = res.status;
                let state: FetchState<D>;

                if ([200, 201, 203, 206].includes(httpCode)) {
                    try {
                        const data = await res.json();
                        state = createFinishedFetchState(data, null, httpCode);
                    } catch (error) {
                        state = createFinishedFetchState(null, error, httpCode);
                    }
                } else {
                    state = createFinishedFetchState(null, null, httpCode);
                }

                return state;
            })

            .catch(error => {
                return createFinishedFetchState(null, error, -1);
            })
            .then(state => {
                if (onFinished) {
                    onFinished(state);
                }
                setFetchState(state);
            });
    };

    const apiFetchCallback = useCallback(apiFetch, []);
    const resetCallback = useCallback(() => setFetchState(createInitialFetchState()), []);

    return useMemo(() => {
        return { ...fetchState, fetch: apiFetchCallback, reset: resetCallback };
    }, [fetchState, apiFetchCallback, resetCallback]);
};

export default useFetch;
