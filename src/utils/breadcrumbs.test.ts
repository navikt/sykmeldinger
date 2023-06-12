import { describe, expect, it } from 'vitest'

import { createInitialServerSideBreadcrumbs, SsrPathVariants } from './breadcrumbs'

describe('createInitialServerSideBreadcrumbs', () => {
    it('should create correct crumbs for Kvittering page', () => {
        const result = createInitialServerSideBreadcrumbs(
            SsrPathVariants.Kvittering,
            { sykmeldingId: 'test-id' },
            false,
        )

        expect(result).toEqual([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
            { handleInApp: true, title: 'Sykmelding', url: '/fake/basepath/test-id' },
            { handleInApp: true, title: 'Kvittering', url: '/' },
        ])
    })

    it('should create correct crumbs for Kvittering page on new routes', () => {
        const result = createInitialServerSideBreadcrumbs(SsrPathVariants.Kvittering, { sykmeldingId: 'test-id' }, true)

        expect(result).toEqual([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath/new' },
            { handleInApp: true, title: 'Sykmelding', url: '/fake/basepath/new/test-id' },
            { handleInApp: true, title: 'Kvittering', url: '/' },
        ])
    })

    it('should create correct crumbs for root and 400', () => {
        const root = createInitialServerSideBreadcrumbs(SsrPathVariants.Root, {}, false)
        const notFound = createInitialServerSideBreadcrumbs(SsrPathVariants.NotFound, {}, false)

        const rootCrumb = [
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
        ]

        expect(root).toEqual(rootCrumb)
        expect(notFound).toEqual(rootCrumb)
    })
})
