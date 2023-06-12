import { DependencyList, useCallback, useEffect, useRef } from 'react'
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useRouter } from 'next/router'
import { useRouter as useRouterServerComponent } from 'next/navigation'
import { logger } from '@navikt/next-logger'

import { browserEnv } from '../utils/env'
import { Breadcrumb, createCompleteCrumbs, LastCrumb } from '../utils/breadcrumbs'

export function useUpdateBreadcrumbs(
    makeCrumbs: () => [...Breadcrumb[], LastCrumb] | [],
    deps?: DependencyList,
    isNew = false,
): void {
    const makeCrumbsRef = useRef(makeCrumbs)
    useEffect(() => {
        makeCrumbsRef.current = makeCrumbs
    }, [makeCrumbs])

    useEffect(() => {
        ;(async () => {
            try {
                const prefixedCrumbs = createCompleteCrumbs(makeCrumbsRef.current(), isNew)
                await setBreadcrumbs(prefixedCrumbs)
            } catch (e) {
                logger.error(`klarte ikke å oppdatere breadcrumbs på ${location.pathname}`)
                logger.error(e)
            }
        })()
        // Custom hook that passes deps array to useEffect, linting will be done where useUpdateBreadcrumbs is used
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

/**
 * Hook into the decorator's breadcrumbs, and use Next's router
 * instead to avoid full page loads on breadcrumb clicks
 */
export function useHandleDecoratorClicks(isAppRouter = false): void {
    const router = (isAppRouter ? useRouter : useRouterServerComponent)()
    const callback = useCallback(
        (breadcrumb: Breadcrumb) => {
            // router.push automatically pre-pends the base route of the application
            router.push(breadcrumb.url.replace(browserEnv.NEXT_PUBLIC_BASE_PATH || '', '') || '/')
        },
        [router],
    )

    useEffect(() => {
        onBreadcrumbClick(callback)
    })
}
