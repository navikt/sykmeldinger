import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Radio, RadioGroup } from '@navikt/ds-react';

import { FormShape, JaEllerNeiType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';
import { useAmplitude } from '../../../../../../amplitude/amplitude';

import UriktigeOpplysninger from './UriktigeOpplysninger';

const fieldName = 'erOpplysningeneRiktige';
const sporsmaltekst = 'Stemmer opplysningene?';

function ErOpplysningeneRiktige(): JSX.Element {
    const logEvent = useAmplitude();
    const { register, unregister, control, watch } = useFormContext<FormShape>();
    const watchErOpplysningeneRiktige = watch(fieldName);

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        });
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify(JaEllerNeiType),
        });

        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                rules={{ required: 'Du må svare på om opplysningene i sykmeldingen er riktige.' }}
                defaultValue={null}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={sporsmaltekst}
                        onChange={(value: 'JA' | 'NEI') => {
                            logEvent(
                                { eventName: 'skjema startet', data: { skjemanavn: 'åpen sykmelding' } },
                                { 'stemmer opplysningene': value },
                            );
                            field.onChange(value);
                        }}
                        error={fieldState.error?.message}
                    >
                        <Radio value="JA">{JaEllerNeiType.JA}</Radio>
                        <Radio value="NEI">{JaEllerNeiType.NEI}</Radio>
                    </RadioGroup>
                )}
            />

            {watchErOpplysningeneRiktige?.svar === 'NEI' && <UriktigeOpplysninger />}
        </QuestionWrapper>
    );
}

export default ErOpplysningeneRiktige;
