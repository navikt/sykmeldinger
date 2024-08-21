import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import {
    BrukerSvarExpansionCard,
    SporsmaltekstMetadata,
} from '../../../../Sykmelding/SykmeldingerSykmeldt/Felles/BrukerSvar'

interface Props {
    sykmeldingId: string
    metadata: SporsmaltekstMetadata
}

function FrilanserOppsummeringSection({ sykmeldingId, metadata }: Props): ReactElement | null {
    const { watch } = useFormContext<FormValues>()

    const formValues = watch()

    return (
        <SectionWrapper>
            <BrukerSvarExpansionCard
                title="Oppsummering av dine svar"
                brukerSvar={{
                    values: formValues,
                    sporsmaltekstMetadata: metadata,
                }}
                sykmeldingId={sykmeldingId}
            />
        </SectionWrapper>
    )
}

export default FrilanserOppsummeringSection
