import React, { ReactElement } from 'react'
import { Alert, BodyShort, Heading, Link as DsLink } from '@navikt/ds-react'

import { Arbeidsgiver, SykmeldingFragment } from 'queries'

import { useFindRelevantArbeidsgivere } from '../../../../../hooks/useFindRelevantArbeidsgivere'
import Spinner from '../../../../Spinner/Spinner'

import ArbeidsledigArbeidsgiverField from './ArbeidsledigArbeidsgiverField'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinfoArbeidsgivere: readonly Arbeidsgiver[]
}

function ArbeidsledigSection({ sykmelding, brukerinfoArbeidsgivere }: Props): ReactElement | null {
    const { arbeidsgivere, error, isLoading } = useFindRelevantArbeidsgivere(sykmelding, brukerinfoArbeidsgivere)

    if (isLoading) return <Spinner headline="Laster arbeidsgivere" />
    if (error) {
        return (
            <Alert className="mt-6" variant="error">
                <Heading spacing size="small" level="3">
                    Det skjedde en feil ved lasting av arbeidsgivere.
                </Heading>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du fortelle oss om feilen på{' '}
                    <DsLink
                        href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler"
                        target="_blank"
                    >
                        skjemaet for feil og mangler
                    </DsLink>
                </BodyShort>
            </Alert>
        )
    }

    if (!arbeidsgivere?.length) return null

    return <ArbeidsledigArbeidsgiverField arbeidsgivere={arbeidsgivere} />
}

export default ArbeidsledigSection
