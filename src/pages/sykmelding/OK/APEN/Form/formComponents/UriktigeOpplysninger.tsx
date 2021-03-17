import React, { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'nav-frontend-skjema';
import { FormData, UriktigeOpplysningerType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const UriktigeOpplysninger: React.FC = () => {
    const { register, unregister, watch } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'uriktigeOpplysninger';
    const watchUriktigeOpplysninger = watch(fieldName);

    const trengerNySykmelding = useMemo(() => {
        return (
            Boolean(watchUriktigeOpplysninger?.svar?.includes('PERIODE')) ||
            Boolean(watchUriktigeOpplysninger?.svar?.includes('SYKMELDINGSGRAD_FOR_HOY'))
        );
    }, [watchUriktigeOpplysninger]);

    useEffect(() => {
        register({
            name: 'uriktigeOpplysninger.sporsmal',
            value: 'Hvilke opplysninger stemmer ikke?',
        });
        register({
            name: 'uriktigeOpplysninger.svartekster',
            value: JSON.stringify(UriktigeOpplysningerType),
        });
        return () => unregister(fieldName);
    }, [register, unregister]);

    return (
        <QuestionWrapper>
            <fieldset>
                <legend>Hvilke opplysninger stemmer ikke?</legend>

                {Object.entries(UriktigeOpplysningerType).map(([key, label], index) => (
                    <div key={key} style={{ marginBottom: '1rem' }}>
                        <Checkbox
                            label={label}
                            name={`${fieldName}.svar`}
                            value={key}
                            id={index === 0 ? fieldName : undefined}
                            checkboxRef={register({ required: 'minst en opplysning må være valgt.' }) as any}
                        />
                    </div>
                ))}

                {/* TODO: convert to checkboxgruppe */}
                {/* https://github.com/react-hook-form/react-hook-form/issues/1517 */}
            </fieldset>

            {trengerNySykmelding ? (
                <div>Siden du ser at perioden er feil trenger du ny sykmelding</div>
            ) : (
                <>
                    {watchUriktigeOpplysninger?.svar?.includes('ARBEIDSGIVER') && (
                        <div>Du kan fortsatt bruke sykmeldingen</div>
                    )}
                </>
            )}
        </QuestionWrapper>
    );
};

export default UriktigeOpplysninger;
