import { describe, expect, it } from 'vitest'

import { createInitialServerSideBreadcrumbs, SsrPathVariants } from './breadcrumbs'

describe('createInitialServerSideBreadcrumbs', () => {
    it('should create correct crumbs for Kvittering page', () => {
        const result = createInitialServerSideBreadcrumbs(SsrPathVariants.Kvittering, { sykmeldingId: 'test-id' })

        expect(result).toEqual([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
            { handleInApp: true, title: 'Sykmelding', url: '/fake/basepath/test-id' },
            { handleInApp: true, title: 'Kvittering', url: '/' },
        ])
    })

    it('should create correct crumbs for root and 400', () => {
        const root = createInitialServerSideBreadcrumbs(SsrPathVariants.Root, {})
        const notFound = createInitialServerSideBreadcrumbs(SsrPathVariants.NotFound, {})

        const rootCrumb = [
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
        ]

        expect(root).toEqual(rootCrumb)
        expect(notFound).toEqual(rootCrumb)
    })
})
