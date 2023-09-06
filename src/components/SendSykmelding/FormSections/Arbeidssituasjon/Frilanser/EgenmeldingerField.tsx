import { ReactElement, useLayoutEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@navikt/ds-react'
import { Add } from '@navikt/ds-icons'
import { sub } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { toDate } from '../../../../../utils/dateUtils'

import EgenmeldingPeriodSubField from './EgenmeldingPeriodSubField'

export type EgenmeldingField = `egenmeldingsperioder.${number}`

interface Props {
    oppfolgingsdato: string
}

function EgenmeldingerField({ oppfolgingsdato }: Props): ReactElement {
    const { control } = useFormContext<FormValues>()
    const { fields, update, append, remove } = useFieldArray({
        control,
        name: 'egenmeldingsperioder',
        shouldUnregister: true,
    })

    // useFieldArray doesn't allow us to set an initial value, so we have to do it manually on mount
    useLayoutEffect(() => {
        // TODO: Refactor mapping so we don't have to rely on effects and RHF to keep state in sync
        update(0, { fom: null, tom: null })
    }, [update])

    return (
        <SectionWrapper title={sporsmal.egenmeldingsperioder(oppfolgingsdato)} level="3" size="small">
            <div className="mt-2 flex flex-col gap-4">
                {fields.map((field, index) => (
                    <EgenmeldingPeriodSubField
                        key={field.id}
                        index={index}
                        remove={remove}
                        oppfolgingsdato={sub(toDate(oppfolgingsdato), { days: 1 })}
                        otherPeriods={fields.filter((it) => it.id !== field.id)}
                    />
                ))}
            </div>
            <Button
                className="mt-4"
                variant="tertiary"
                icon={<Add role="img" aria-hidden />}
                type="button"
                onClick={() =>
                    append(
                        { fom: null, tom: null },
                        { shouldFocus: true, focusName: `egenmeldingsperioder.${fields.length}.fom` },
                    )
                }
            >
                Legg til ekstra periode
            </Button>
        </SectionWrapper>
    )
}

export default EgenmeldingerField
