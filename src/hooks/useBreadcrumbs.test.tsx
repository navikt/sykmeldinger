import * as dekoratoren from '@navikt/nav-dekoratoren-moduler'

import { renderHook } from '../utils/test/testUtils'

import { createInitialServerSideBreadcrumbs, SsrPathVariants, useUpdateBreadcrumbs } from './useBreadcrumbs'

jest.mock('@navikt/nav-dekoratoren-moduler')

describe('useUpdateBreadcrumbs', () => {
    it('should update when given a single crumb, automatically setting the URL', () => {
        const spy = jest.spyOn(dekoratoren, 'setBreadcrumbs')
        renderHook(() => useUpdateBreadcrumbs(() => [{ title: 'Papirsykmelding' }]))

        expect(spy).toHaveBeenCalledWith([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
            { handleInApp: true, title: 'Papirsykmelding', url: '/' },
        ])
    })

    it('should update when given two crumbs, automatically setting the URL for the last crumb', () => {
        const spy = jest.spyOn(dekoratoren, 'setBreadcrumbs')
        renderHook(() =>
            useUpdateBreadcrumbs(() => [{ title: 'Test Crumb 1', url: '/first/path' }, { title: 'Test Crumb 2' }]),
        )

        expect(spy).toHaveBeenCalledWith([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
            { handleInApp: true, title: 'Test Crumb 1', url: '/fake/basepath/first/path' },
            { handleInApp: true, title: 'Test Crumb 2', url: '/' },
        ])
    })

    it('should update when given multiple crumbs, automatically setting the URL for the last crumb', () => {
        const spy = jest.spyOn(dekoratoren, 'setBreadcrumbs')
        renderHook(() =>
            useUpdateBreadcrumbs(() => [
                { title: 'Test Crumb 1', url: '/first/path' },
                { title: 'Test Crumb 2', url: '/second/path' },
                { title: 'Test Crumb 3' },
            ]),
        )

        expect(spy).toHaveBeenCalledWith([
            { handleInApp: false, title: 'Min side', url: '/test-min-side' },
            { handleInApp: false, title: 'Ditt sykefravær', url: '/test-ditt-sykefravaer' },
            { handleInApp: true, title: 'Sykmeldinger', url: '/fake/basepath' },
            { handleInApp: true, title: 'Test Crumb 1', url: '/fake/basepath/first/path' },
            { handleInApp: true, title: 'Test Crumb 2', url: '/fake/basepath/second/path' },
            { handleInApp: true, title: 'Test Crumb 3', url: '/' },
        ])
    })
})

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
