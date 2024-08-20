import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@apollo/client'
import { Alert } from '@navikt/ds-react'

import { SykmeldingErUtenforVentetidDocument, YesOrNo } from 'queries'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import Spinner from '../../../../Spinner/Spinner'

import HarBruktEgenmeldingsPerioderField from './HarBruktEgenmeldingsPerioderField'
import FrilanserEgenmeldingPerioderField from './FrilanserEgenmeldingPerioderField'
import HarForsikringField from './HarForsikringField'
import {
    BrukerSvarExpansionCard,
    SporsmaltekstMetadata
} from "../../../../Sykmelding/SykmeldingerSykmeldt/Felles/BrukerSvar";

interface Props {
    sykmeldingId: string
    sykmeldingStartDato: string
    metadata: SporsmaltekstMetadata
}

function FrilanserOppsummeringSection({ sykmeldingId, sykmeldingStartDato, metadata }: Props): ReactElement | null {
    const { watch } = useFormContext<FormValues>()

    const formValues = watch()

    return (
        <SectionWrapper title="Oppsummering av dine svar">
            { (
                <BrukerSvarExpansionCard
                    title="Oppsummering av dine svar"
                    brukerSvar={{
                        values: formValues,
                        sporsmaltekstMetadata: metadata,
                    }}
                    sykmeldingId={sykmeldingId}
                />
            )}

        </SectionWrapper>
    )
}

export default FrilanserOppsummeringSection
