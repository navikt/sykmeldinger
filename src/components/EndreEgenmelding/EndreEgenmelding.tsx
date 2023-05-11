import { Alert, BodyShort, Heading, Link as DsLink } from '@navikt/ds-react'
import Link from 'next/link'
import React from 'react'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../fetching/graphql.generated'
import { useFindPrevSykmeldingTom } from '../../hooks/useFindPrevSykmeldingTom'
import Spinner from '../Spinner/Spinner'
import { hasHitPreviousSykmeldingTom } from '../FormComponents/Egenmelding/egenmeldingsdagerFieldUtils'

import EndreEgenmeldingForm from './EndreEgenmeldingForm'

type EndreEgenmeldingProps = {
    sykmelding: SykmeldingFragment
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment | null
}

function EndreEgenmelding({ sykmelding, egenmeldingsdager }: EndreEgenmeldingProps): JSX.Element {
    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(
        sykmelding,
        sykmelding.sykmeldingStatus.arbeidsgiver?.orgnummer,
    )
    const isRightAgainstPreviousSykmelding = hasHitPreviousSykmeldingTom(sykmelding, previousSykmeldingTom)

    if (isLoading) return <Spinner headline="Laster egenmeldingsdagerinformasjon" />
    if (error)
        return (
            <Alert variant="error">
                <Heading spacing size="small" level="3">
                    Det skjedde en feil ved lasting av egenmeldingsdagerinformasjon.
                </Heading>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du fortelle oss om feilen på{' '}
                    <DsLink href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        skjemaet for feil og mangler
                    </DsLink>
                    .
                </BodyShort>
                <Link href={`/${sykmelding.id}`}>Tilbake til sykmeldingen</Link>
            </Alert>
        )

    if (isRightAgainstPreviousSykmelding) {
        return (
            <Alert variant="error">
                <Heading spacing size="small" level="3">
                    Du kan ikke legge til egenmeldingsdager på denne sykmeldingen.
                </Heading>
                <BodyShort spacing>
                    Dersom du klikket på en lenke for å komme hit, kan du rapportere det på{' '}
                    <DsLink href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        skjemaet for feil og mangler
                    </DsLink>
                    .
                </BodyShort>
                <Link href={`/${sykmelding.id}`}>Tilbake til sykmeldingen</Link>
            </Alert>
        )
    }

    return (
        <EndreEgenmeldingForm
            sykmelding={sykmelding}
            egenmeldingsdager={egenmeldingsdager}
            previousSykmeldingTom={previousSykmeldingTom}
        />
    )
}

export default EndreEgenmelding
