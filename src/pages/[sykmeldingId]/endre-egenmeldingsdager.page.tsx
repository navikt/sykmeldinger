import { ReactElement } from 'react'
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

function EndreEgenmeldingsdagerPage(): ReactElement {
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
            <GuidePanel className="mb-8">
                <Heading level="2" size="small" spacing>
                    Endre egenmeldingsdager
                </Heading>
                <BodyShort spacing>Under kan du endre, fjerne eller legge til egenmeldingsdager.</BodyShort>
                <BodyShort>Når du er ferdig registrerer du endringene, nederst på siden.</BodyShort>
            </GuidePanel>
            {!data && loading && <Spinner className="mt-16" headline="Laster sykmelding" />}
            {error && (
                <Alert className="my-8" variant="error">
                    Vi har problemer med å laste sykmeldingen din for øyeblikket. Vennligst prøv igjen senere.
                </Alert>
            )}
            {sykmelding != null && (
                <>
                    {!isSendtSykmelding(sykmelding) && (
                        <Alert variant="error" className="my-8">
                            Sykmeldingen er ikke sendt, og kan derfor ikke redigeres.
                        </Alert>
                    )}
                    <SykmeldingenGjelder pasient={sykmelding.pasient} parentId="edit-egenmeldingsdager" />
                    <Perioder
                        perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                        isV3={isV3(sykmelding)}
                        parentId="edit-egenmeldingsdager"
                    />
                    <EndreEgenmelding sykmelding={sykmelding} egenmeldingsdager={egenmeldingsdager} />
                </>
            )}
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default EndreEgenmeldingsdagerPage
