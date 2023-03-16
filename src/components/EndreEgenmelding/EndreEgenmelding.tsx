import { Alert, Button } from '@navikt/ds-react'
import Link from 'next/link'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../fetching/graphql.generated'
import { useFindPrevSykmeldingTom } from '../../hooks/useFindPrevSykmeldingTom'
import Spinner from '../Spinner/Spinner'

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

    if (isLoading) return <Spinner headline="Laster egenmeldingsdagerinformasjon" />
    if (error)
        return (
            <Alert variant="error">
                Det skjedde en feil ved lasting av egenmeldingsdagerinformasjon.
                <Link href={`/${sykmelding.id}`} legacyBehavior passHref>
                    <Button as="a" variant="secondary">
                        Lukk
                    </Button>
                </Link>
            </Alert>
        )

    return (
        <EndreEgenmeldingForm
            sykmelding={sykmelding}
            egenmeldingsdager={egenmeldingsdager}
            previousSykmeldingTom={previousSykmeldingTom}
        />
    )
}

export default EndreEgenmelding
