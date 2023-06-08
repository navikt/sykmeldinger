import { PropsWithChildren } from 'react'
import { Alert } from '@navikt/ds-react'
import Head from 'next/head'
import { logger } from '@navikt/next-logger'

import Spinner from '../components/Spinner/Spinner'
import useSykmeldinger from '../hooks/useSykmeldinger'
import useHotjarTrigger from '../hooks/useHotjarTrigger'
import { SykmeldingInfoAccordion } from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import SykmeldingLinkPanel from '../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import Header from '../components/Header/Header'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import { withAuthenticatedPage } from '../auth/withAuthentication'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import useFocusRefetch from '../hooks/useFocusRefetch'
import { filterSykmeldinger } from '../utils/sykmeldingFilterUtils'

function SykmeldingerPage(): JSX.Element {
    useHotjarTrigger('SYKMELDING_LISTEVISNING')

    const { data, error, loading, refetch } = useSykmeldinger()

    useFocusRefetch(refetch)

    if (data?.sykmeldinger == null && loading) {
        return (
            <div className="mb-8">
                <Spinner headline="Henter dine sykmeldinger" />
            </div>
        )
    }

    if (error) {
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </IndexWrapper>
        )
    }
    if (data?.sykmeldinger == null) {
        logger.error('Sykmeldinger is undefined')
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </IndexWrapper>
        )
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger)

    return (
        <IndexWrapper>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />
            <SykmeldingInfoAccordion />
            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </IndexWrapper>
    )
}

function IndexWrapper({ children }: PropsWithChildren): JSX.Element {
    useUpdateBreadcrumbs(() => [])

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                {children}
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
