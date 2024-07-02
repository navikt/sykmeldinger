import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { Alert } from '@navikt/ds-react'

import { FormValues } from 'src/components/SendSykmelding/SendSykmeldingForm'
import { SykmeldingFragment, YesOrNo } from 'queries'

import YesNoField from '../../../../../FormComponents/YesNoField/YesNoField'
import { SectionWrapper } from '../../../../../FormComponents/FormStructure'
import FiskerSelvstendigSection from '../FiskerSelvstendig/FiskerSelvstendigSection'

type Props = {
    sykmelding: SykmeldingFragment
}

/**
 * This is a custom flow that allows users with no arbeidsgivere to bekreft their sykmelding as a selvstending næringsdrivende.
 */
function ArbeidsgiverFiskereFallbackSection({ sykmelding }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const overstyrArbeidsgiver = watch('fisker.overstyrArbeidsgiver')

    return (
        <SectionWrapper>
            <YesNoField<FormValues>
                name="fisker.overstyrArbeidsgiver"
                legend="Vil du bekrefte sykmeldingen til NAV alikevel?"
                rules={{
                    required: 'Du må svare om du vil bekrefte sykmeldingen til NAV eller ikke',
                    validate: (value) => {
                        if (value === YesOrNo.NO) {
                            return 'Dersom du ikke vil bekrefte sykmeldingen til NAV, må du be arbeidsgiver oppdatere arbeidsforholdet ditt.'
                        }

                        return true
                    },
                }}
            />
            {overstyrArbeidsgiver === YesOrNo.NO && (
                <Alert className="my-8" variant="info" role="alert" aria-live="polite">
                    TODO: Be sjefen din fikse det! Du kan ikke sende sykmeldingen til NAV før arbeidsforholdet ditt er
                    registrert.
                </Alert>
            )}
            {overstyrArbeidsgiver === YesOrNo.YES && (
                <FiskerSelvstendigSection sykmelding={sykmelding} askForsikring={false} />
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverFiskereFallbackSection
