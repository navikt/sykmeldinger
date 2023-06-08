import { ParsedUrlQuery } from 'querystring'

import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { SykmeldingFragment } from '../fetching/graphql.generated'

import { browserEnv } from './env'
import { getSykmeldingTitle } from './sykmeldingUtils'

export type Breadcrumb = { title: string; url: string }
export type LastCrumb = { title: string }
export type CompleteCrumb = Parameters<typeof setBreadcrumbs>[0][0]

export const baseCrumb: CompleteCrumb[] = [
    {
        title: 'Min side',
        url: browserEnv.NEXT_PUBLIC_MIN_SIDE_ROOT || '/',
        handleInApp: false,
    },
    {
        title: 'Ditt sykefravær',
        url: browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT || '/',
        handleInApp: false,
    },
    {
        title: 'Sykmeldinger',
        url: browserEnv.NEXT_PUBLIC_BASE_PATH || '/',
        handleInApp: true,
    },
]

/**
 * The last crumb does not need to provide a URL, since it's only used to display the text for the "active" crumb.
 */
export function createCompleteCrumbs(breadcrumbs: [...Breadcrumb[], LastCrumb] | []): CompleteCrumb[] {
    const prefixedCrumbs: CompleteCrumb[] = breadcrumbs.map(
        (it): CompleteCrumb => ({
            ...it,
            url: 'url' in it ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}${it.url}` : '/',
            handleInApp: true,
        }),
    )

    return [...baseCrumb, ...prefixedCrumbs]
}

export function createKvitteringBreadcrumbs(
    sykmeldingId: string,
    sykmelding: SykmeldingFragment | undefined,
): [Breadcrumb, LastCrumb] {
    return [{ title: getSykmeldingTitle(sykmelding), url: `/${sykmeldingId}` }, { title: 'Kvittering' }]
}

export function createEndreEgenmeldingsdagerBreadcrumbs(
    sykmeldingId: string,
    sykmelding: SykmeldingFragment | undefined,
): [Breadcrumb, LastCrumb] {
    return [{ title: getSykmeldingTitle(sykmelding), url: `/${sykmeldingId}` }, { title: 'Endre egenmeldingsdager' }]
}

export function createSykmeldingBreadcrumbs(sykmelding: SykmeldingFragment | undefined): [LastCrumb] {
    return [{ title: getSykmeldingTitle(sykmelding) }]
}

/**
 * These are all the paths in the application that have unique breadcrumbs.
 */
export enum SsrPathVariants {
    Root = '/',
    NotFound = '/404',
    Error = '/500',
    Sykmelding = '/[sykmeldingId]',
    Kvittering = '/[sykmeldingId]/kvittering',
    EndreEgenmeldingsdager = '/[sykmeldingId]/endre-egenmeldingsdager',
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
        case SsrPathVariants.Error:
            return createCompleteCrumbs([])
        case SsrPathVariants.Sykmelding:
            return createCompleteCrumbs(createSykmeldingBreadcrumbs(undefined))
        case SsrPathVariants.Kvittering:
            return createCompleteCrumbs(createKvitteringBreadcrumbs(query.sykmeldingId as string, undefined))
        case SsrPathVariants.EndreEgenmeldingsdager:
            return createCompleteCrumbs(
                createEndreEgenmeldingsdagerBreadcrumbs(query.sykmeldingId as string, undefined),
            )
        default:
            logger.error(`Unknown initial path (${pathname}), defaulting to just base breadcrumb`)
            return createCompleteCrumbs([])
    }
}
