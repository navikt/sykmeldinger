import React from 'react'
import { Alert, BodyShort, GuidePanel, Heading } from '@navikt/ds-react'

import Perioder from '../../components/SykmeldingViews/SykmeldingView/Sections/SykmeldingViewSykmeldt/Perioder'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import useSykmeldingById from '../../hooks/useSykmeldingById'
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam'
import Spinner from '../../components/Spinner/Spinner'
import SykmeldingenGjelder from '../../components/SykmeldingViews/SykmeldingView/Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import { isSendtSykmelding, isV3 } from '../../utils/sykmeldingUtils'
import { getSykmeldingperioderSorted } from '../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../utils/egenmeldingsdagerUtils'
import { withAuthenticatedPage } from '../../auth/withAuthentication'
import EndreEgenmelding from '../../components/EndreEgenmelding/EndreEgenmelding'
import { createEndreEgenmeldingsdagerBreadcrumbs, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { getPublicEnv } from '../../utils/env'

import styles from './endre-egenmeldingsdager.page.module.css'

const publicEnv = getPublicEnv()

function EndreEgenmeldingsdagerPage(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam()
    const { data, loading, error } = useSykmeldingById(sykmeldingId)
    const sykmelding = data?.sykmelding
    const egenmeldingsdager = sykmelding ? findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe) : null

    useUpdateBreadcrumbs(
        () => createEndreEgenmeldingsdagerBreadcrumbs(sykmeldingId, sykmelding),
        [sykmeldingId, sykmelding],
    )

    return (
        <PageWrapper>
            <GuidePanel>
                <Heading level="2" size="small" spacing>
                    Endre egenmeldingsdager
                </Heading>
                <BodyShort spacing>Under her kan du endre, fjerne eller legge til egenmeldingsdager.</BodyShort>
                <BodyShort>Når du er ferdig, registrerer du endringene dine på nytt, nederst på siden.</BodyShort>
            </GuidePanel>
            {!data && loading && <Spinner headline="Laster sykmelding" />}
            {error && <Alert variant="error">{error.message}</Alert>}
            {sykmelding != null && (
                <>
                    {!isSendtSykmelding(sykmelding) && (
                        <Alert variant="error" className={styles.notSentAlert}>
                            Sykmeldingen er ikke sendt, og kan derfor ikke redigeres.
                        </Alert>
                    )}
                    <SykmeldingenGjelder pasient={sykmelding.pasient} />
                    <Perioder
                        perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                        isV3={isV3(sykmelding)}
                    />
                    {egenmeldingsdager ? (
                        <EndreEgenmelding sykmelding={sykmelding} egenmeldingsdager={egenmeldingsdager} />
                    ) : (
                        <Alert variant="warning">Sykmeldingen har ingen egenmeldingsdager som kan redigeres.</Alert>
                    )}
                </>
            )}
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage(async () => {
    if (publicEnv.DISPLAY_EGENMELDING !== 'true') {
        return { notFound: true }
    }

    return { props: {} }
})

export default EndreEgenmeldingsdagerPage
