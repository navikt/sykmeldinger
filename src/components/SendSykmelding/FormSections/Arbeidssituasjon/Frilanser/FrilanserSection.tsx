import React, {ReactElement} from 'react'
import {useFormContext} from 'react-hook-form'
import {useQuery} from '@apollo/client'
import {Alert} from '@navikt/ds-react'

import {SykmeldingErUtenforVentetidDocument, YesOrNo} from 'queries'

import {FormValues} from '../../../SendSykmeldingForm'
import {SectionWrapper} from '../../../../FormComponents/FormStructure'
import Spinner from '../../../../Spinner/Spinner'

import HarBruktEgenmeldingsPerioderField from './HarBruktEgenmeldingsPerioderField'
import FrilanserEgenmeldingPerioderField from './FrilanserEgenmeldingPerioderField'
import HarForsikringField from './HarForsikringField'
import FrilanserOppsummeringSection from "./FrilanserOppsummeringSection";
import {getSykmeldingStartDate} from "../../../../../utils/sykmeldingUtils";
import {useShouldShowSummaryForFrilanser} from "../formProgressUtils";
import {mapFrilanserFormValuesToBrukerSvar} from "../../../../Sykmelding/SykmeldingerSykmeldt/Felles/BrukerSvarUtils";

interface Props {
    sykmeldingId: string
    sykmeldingStartDato: string
}

function FrilanserSection({sykmeldingId, sykmeldingStartDato}: Props): ReactElement | null {
    const {watch} = useFormContext<FormValues>()
    const harBruktEgenmelding = watch('harBruktEgenmelding')
    const {data, loading, error} = useQuery(SykmeldingErUtenforVentetidDocument, {
        variables: {sykmeldingId},
    })

    if (loading) {
        return (
            <div className="mt-8 mb-24">
                <Spinner headline="Henter ekstra informasjon"/>
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
    const formValues = watch()
    const mappedValues = mapFrilanserFormValuesToBrukerSvar(formValues, oppfolgingsdato)

    return (
        <SectionWrapper title="Fravær før sykmeldingen">
            <HarBruktEgenmeldingsPerioderField oppfolgingsdato={oppfolgingsdato}/>
            {harBruktEgenmelding === YesOrNo.YES && (
                <FrilanserEgenmeldingPerioderField oppfolgingsdato={oppfolgingsdato}/>
            )}
            <HarForsikringField/>
            {useShouldShowSummaryForFrilanser() && mappedValues.harForsikring !== null && mappedValues.harBruktEgenmelding !== null && (
                <FrilanserOppsummeringSection
                    metadata={{
                        sykmeldingId: sykmeldingId,
                        arbeidsgiverNavn: null,
                        narmestelederNavn: null,
                        sykmeldingStartDato: sykmeldingStartDato,
                    }}
                    sykmeldingId={sykmeldingId}
                    sykmeldingStartDato={sykmeldingStartDato}
                />)}
        </SectionWrapper>
    )
}

export default FrilanserSection
