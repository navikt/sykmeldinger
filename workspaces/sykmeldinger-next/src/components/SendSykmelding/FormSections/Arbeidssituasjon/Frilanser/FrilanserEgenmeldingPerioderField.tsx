import { ReactElement } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@navikt/ds-react'
import { PlusIcon } from '@navikt/aksel-icons'
import { sub } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { toDate } from '../../../../../utils/dateUtils'

import FrilanserEgenmeldingPeriodSubField from './FrilanserEgenmeldingPeriodSubField'

interface Props {
    oppfolgingsdato: string
}

function FrilanserEgenmeldingPerioderField({ oppfolgingsdato }: Props): ReactElement {
    const { control } = useFormContext<FormValues>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'egenmeldingsperioder',
    })

    return (
        <SectionWrapper title={sporsmal.egenmeldingsperioder(oppfolgingsdato)} level="3" size="small">
            <ul className="mt-2 flex flex-col gap-4">
                {fields.map((field, index) => (
                    <FrilanserEgenmeldingPeriodSubField
                        key={field.id}
                        index={index}
                        remove={remove}
                        oppfolgingsdato={sub(toDate(oppfolgingsdato), { days: 1 })}
                        otherPeriods={fields.filter((it) => it.id !== field.id)}
                    />
                ))}
            </ul>
            <Button
                className="mt-4"
                variant="tertiary"
                icon={<PlusIcon role="img" aria-hidden />}
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

export default FrilanserEgenmeldingPerioderField
