import React, { useMemo, useEffect, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';

import { FormShape, UriktigeOpplysningerType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';
import { AvbrytContext } from '../../AvbrytContext';
import Spacing from '../../../../../Spacing/Spacing';
import UriktigeOpplysningerInfo from '../UriktigeOpplysningerInfo';

const UriktigeOpplysninger: React.FC = () => {
    const { register, unregister, control, watch, errors } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'uriktigeOpplysninger';
    const watchUriktigeOpplysninger = watch(fieldName);
    const { setMaAvbryte } = useContext(AvbrytContext);

    const trengerNySykmelding = useMemo(() => {
        return (
            Boolean(watchUriktigeOpplysninger?.svar?.includes('PERIODE')) ||
            Boolean(watchUriktigeOpplysninger?.svar?.includes('SYKMELDINGSGRAD_FOR_LAV'))
        );
    }, [watchUriktigeOpplysninger]);

    useEffect(() => {
        setMaAvbryte(trengerNySykmelding);
    }, [trengerNySykmelding, setMaAvbryte]);

    useEffect(() => {
        register({
            name: 'uriktigeOpplysninger.sporsmaltekst',
            value: 'Hvilke opplysninger stemmer ikke?',
        });
        register({
            name: 'uriktigeOpplysninger.svartekster',
            value: JSON.stringify(UriktigeOpplysningerType),
        });
        return () => {
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
            setMaAvbryte(false);
        };
    }, [register, unregister, setMaAvbryte]);

    return (
        <QuestionWrapper>
            <Controller
                name={`${fieldName}.svar`}
                control={control}
                defaultValue={null}
                rules={{
                    validate: (val: [] | undefined) =>
                        val == null || val.length <= 0
                            ? 'Du må svare på hvilke opplysninger som ikke stemmer.'
                            : undefined,
                }}
                render={({ onChange: onCheckboxChange, value }) => (
                    <CheckboksPanelGruppe
                        legend="Hvilke opplysninger stemmer ikke?"
                        checkboxes={Object.entries(UriktigeOpplysningerType).map(([key, label], index) => ({
                            label: label,
                            value: key,
                            checked: value?.includes(key),
                            id: index === 0 ? fieldName : undefined,
                        }))}
                        onChange={(_e, checkedValue) => {
                            const oldValues = value as (keyof typeof UriktigeOpplysningerType)[] | undefined;
                            const newVals = oldValues?.includes(checkedValue)
                                ? oldValues.filter((vals) => vals !== checkedValue)
                                : [...(oldValues ?? []), checkedValue];
                            onCheckboxChange(newVals);
                        }}
                        // @ts-expect-error Shape of errors is wrong when field is an array
                        feil={errors.uriktigeOpplysninger?.svar?.message}
                    />
                )}
            />

            <Spacing direction="top" amount="small">
                <UriktigeOpplysningerInfo uriktigeOpplysninger={watchUriktigeOpplysninger?.svar} />
            </Spacing>
        </QuestionWrapper>
    );
};

export default UriktigeOpplysninger;
