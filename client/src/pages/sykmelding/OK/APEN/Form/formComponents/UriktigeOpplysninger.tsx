import React, { useMemo } from 'react';
import { useFormContext, Validate } from 'react-hook-form';
import { Checkbox } from 'nav-frontend-skjema';
import { FormData, UriktigeOpplysningerType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const UriktigeOpplysninger: React.FC = () => {
    const { getValues, register, watch } = useFormContext<FormData>();
    const watchUriktigeOpplysninger = watch('uriktigeOpplysninger');

    const atLeastOne: Validate = () => {
        if (getValues('uriktigeOpplysninger')?.length) {
            return true;
        }
        return 'Velg minst en';
    };

    const trengerNySykmelding = useMemo(() => {
        return (
            Boolean(watchUriktigeOpplysninger?.includes('PERIODE')) ||
            Boolean(watchUriktigeOpplysninger?.includes('SYKMELDINGSGRAD_FOR_HOY'))
        );
    }, [watchUriktigeOpplysninger]);

    return (
        <QuestionWrapper>
            <fieldset>
                <legend>Hvilke opplysninger stemmer ikke?</legend>

                {Object.entries(UriktigeOpplysningerType).map(([key, label]) => (
                    <div key={key} style={{ marginBottom: '1rem' }}>
                        <Checkbox
                            label={label}
                            name="uriktigeOpplysninger"
                            value={key}
                            id={key}
                            checkboxRef={register({ validate: atLeastOne }) as any}
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
                    {watchUriktigeOpplysninger?.includes('ARBEIDSGIVER') && (
                        <div>Du kan fortsatt bruke sykmeldingen</div>
                    )}
                </>
            )}
        </QuestionWrapper>
    );
};

export default UriktigeOpplysninger;
