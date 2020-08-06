import { useState, useCallback, useMemo } from 'react';

type FetchStatus = 'NOT_STARTET' | 'PENDING' | 'FINISHED' | 'ERROR';

interface FetchState<D> {
    status: FetchStatus;
    data?: D;
    error?: Error;
}

interface Fetch<D> extends FetchState<D> {
    fetch: (request?: RequestInit) => void;
}

const getInitialFetchState = (): FetchState<any> => ({
    status: 'NOT_STARTET',
});

export const areAnyNotStartetOrPending = (statuses: FetchStatus[]): boolean =>
    statuses.some((status) => status === 'NOT_STARTET' || status === 'PENDING');

export const areAnyPendingOrFinished = (statuses: FetchStatus[]): boolean =>
    statuses.some((status) => status === 'FINISHED' || status === 'PENDING');

export const areAnyPending = (statuses: FetchStatus[]): boolean => statuses.some((status) => status === 'PENDING');

export const areAnyError = (statuses: FetchStatus[]): boolean => statuses.some((status) => status === 'ERROR');

/**
 * Custom hook for containing state when fetching from an api.
 *
 * @param {string} url Url to call the api with.
 * @param {(data: any) => D} transformDataOnFinish If the raw data needs to be transformed before being put into state.
 * @return {Fetch<D>} Fetch object conatining status, data, error and fetch.
 */
const useFetch = <D extends {}>(
    url: string,
    transformDataOnFinish?: (data: any) => D,
    onSuccess?: (data: D) => any,
): Fetch<D> => {
    const [fetchState, setFetchState] = useState<FetchState<D>>(getInitialFetchState());

    const apiFetch = (request?: RequestInit) => {
        setFetchState((fetchState) => ({ ...fetchState, status: 'PENDING', error: undefined }));
        fetch(url, request)
            .then((res) => {
                if (res.status === 401) {
                    // Redirect to loginservice to get tokens if 401 Unauthorized
                    window.location.href = `${process.env.REACT_APP_LOGINSERVICE_URL}?redirect=${window.location.href}`;
                } else if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
            })
            .then(({ body }) => {
                setFetchState({
                    status: 'FINISHED',
                    data: transformDataOnFinish ? transformDataOnFinish(body) : body,
                });
                if (onSuccess) {
                    onSuccess(body);
                }
            })
            .catch((error) => setFetchState({ status: 'ERROR', error }));
    };

    const apiFetchCallback = useCallback(apiFetch, []);
    return useMemo(() => {
        return { ...fetchState, fetch: apiFetchCallback };
    }, [fetchState, apiFetchCallback]);
};

export default useFetch;
