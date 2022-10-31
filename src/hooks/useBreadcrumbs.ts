import { ParsedUrlQuery } from 'querystring';

import { DependencyList, useCallback, useEffect, useRef } from 'react';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { logger } from '@navikt/next-logger';

import { Sykmelding } from '../fetching/graphql.generated';
import { getSykmeldingTitle } from '../utils/sykmeldingUtils';
import { getPublicEnv } from '../utils/env';

type Breadcrumb = { title: string; url: string };
type LastCrumb = { title: string };
type CompleteCrumb = Parameters<typeof setBreadcrumbs>[0][0];

const publicEnv = getPublicEnv();

const baseCrumb: CompleteCrumb[] = [
    {
        title: 'Min side',
        url: publicEnv.MIN_SIDE_ROOT || '/',
        handleInApp: false,
    },
    {
        title: 'Ditt sykefravær',
        url: publicEnv.SYKEFRAVAER_ROOT || '/',
        handleInApp: false,
    },
    {
        title: 'Sykmeldinger',
        url: publicEnv.publicPath || '/',
        handleInApp: true,
    },
];

/**
 * The last crumb does not need to provide a URL, since it's only used to display the text for the "active" crumb.
 */
function createCompleteCrumbs(breadcrumbs: [...Breadcrumb[], LastCrumb] | []): CompleteCrumb[] {
    const prefixedCrumbs: CompleteCrumb[] = breadcrumbs.map(
        (it): CompleteCrumb => ({
            ...it,
            url: 'url' in it ? `${publicEnv.publicPath}${it.url}` : '/',
            handleInApp: true,
        }),
    );

    return [...baseCrumb, ...prefixedCrumbs];
}

export function useUpdateBreadcrumbs(makeCrumbs: () => [...Breadcrumb[], LastCrumb] | [], deps?: DependencyList): void {
    const makeCrumbsRef = useRef(makeCrumbs);
    useEffect(() => {
        makeCrumbsRef.current = makeCrumbs;
    }, [makeCrumbs]);

    useEffect(() => {
        (async () => {
            try {
                const prefixedCrumbs = createCompleteCrumbs(makeCrumbsRef.current());
                await setBreadcrumbs(prefixedCrumbs);
            } catch (e) {
                logger.error(`klarte ikke å oppdatere breadcrumbs på ${location.pathname}`);
                logger.error(e);
            }
        })();
        // Custom hook that passes deps array to useEffect, linting will be done where useUpdateBreadcrumbs is used
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/**
 * Hook into the decorator's breadcrumbs, and use Next's router
 * instead to avoid full page loads on breadcrumb clicks
 */
export function useHandleDecoratorClicks(): void {
    const router = useRouter();
    const callback = useCallback(
        (breadcrumb: Breadcrumb) => {
            // router.push automatically pre-pends the base route of the application
            router.push(breadcrumb.url.replace(publicEnv.publicPath || '', '') || '/');
        },
        [router],
    );

    useEffect(() => {
        onBreadcrumbClick(callback);
    });
}

export function createKvitteringBreadcrumbs(
    sykmeldingId: string,
    sykmelding: Sykmelding | undefined,
): [Breadcrumb, LastCrumb] {
    return [{ title: getSykmeldingTitle(sykmelding), url: `/${sykmeldingId}` }, { title: 'Kvittering' }];
}

/**
 * These are all the paths in the application that have unique breadcrumbs.
 */
export enum SsrPathVariants {
    Root = '/',
    NotFound = '/404',
    Sykmelding = '/[sykmeldingId]',
    Kvittering = '/[sykmeldingId]/kvittering',
}

/**
 * Creates various breadcrumbs depending on which route is Server Side Rendered. These are in essence
 * just a SSR-version of the fully detailed breadcrumb-logic that happens in each page component.
 *
 * The reason for duplicating this logic is to avoid as much unecessary repainting when the app is hydrated
 * after a the initial SSR paint. But some of the breadcrumbs rely on the data that is fetched, so these
 * initial SSR breadcrumbs are without any user names.
 *
 * Any changes here should also be reflected in the page's breadcrumb logic.
 */
export function createInitialServerSideBreadcrumbs(
    pathname: SsrPathVariants | string,
    query: ParsedUrlQuery,
): CompleteCrumb[] {
    switch (pathname) {
        case SsrPathVariants.Root:
        case SsrPathVariants.NotFound:
        case SsrPathVariants.Sykmelding:
            return createCompleteCrumbs([]);
        case SsrPathVariants.Kvittering:
            return createCompleteCrumbs(createKvitteringBreadcrumbs(query.sykmeldingId as string, undefined));
        default:
            logger.error(`Unknown initial path (${pathname}), defaulting to just base breadcrumb`);
            return createCompleteCrumbs([]);
    }
}
