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

function FrilanserSection({ sykmeldingId, sykmeldingStartDato, metadata }: Props): ReactElement | null {
    const { watch } = useFormContext<FormValues>()
    const harBruktEgenmelding = watch('harBruktEgenmelding')
    const { data, loading, error } = useQuery(SykmeldingErUtenforVentetidDocument, {
        variables: { sykmeldingId },
    })
    const formValues = watch()
    if (loading) {
        return (
            <div className="mt-8 mb-24">
                <Spinner headline="Henter ekstra informasjon" />
            </div>
        )
    }

    if (error || !data) {
        return (
            <Alert variant="error" role="alert" className="mt-4">
                Vi klarte dessverre ikke å hente informasjonen som trengs for at du kan bruke sykmeldingen. Vennligst
                prøv igjen senere.
            </Alert>
        )
    }

    if (data.sykmeldingUtenforVentetid.erUtenforVentetid) {
        return null
    }

    const oppfolgingsdato = data?.sykmeldingUtenforVentetid.oppfolgingsdato || sykmeldingStartDato

    return (
        <SectionWrapper title="Fravær før sykmeldingen">
            <HarBruktEgenmeldingsPerioderField oppfolgingsdato={oppfolgingsdato} />
            {harBruktEgenmelding === YesOrNo.YES && (
                <FrilanserEgenmeldingPerioderField oppfolgingsdato={oppfolgingsdato} />
            )}
            <HarForsikringField />
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

export default FrilanserSection
