import React, { useMemo, useEffect, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, UriktigeOpplysningerType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';
import { AvbrytContext } from '../../AvbrytContext';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';

const UriktigeOpplysninger: React.FC = () => {
    const { register, unregister, control, watch, errors } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'uriktigeOpplysninger';
    const watchUriktigeOpplysninger = watch(fieldName);
    const { setMaAvbryte } = useContext(AvbrytContext);

    const trengerNySykmelding = useMemo(() => {
        return (
            Boolean(watchUriktigeOpplysninger?.svar?.includes('PERIODE')) ||
            Boolean(watchUriktigeOpplysninger?.svar?.includes('SYKMELDINGSGRAD_FOR_HOY'))
        );
    }, [watchUriktigeOpplysninger]);

    const alertstripetekst: string | undefined = useMemo(() => {
        const value = watchUriktigeOpplysninger?.svar;
        if (!value) {
            return undefined;
        } else if (value.includes('PERIODE')) {
            return 'Siden du sier at perioden er feil må du be den som sykmeldte deg om å skrive en ny sykmelding.';
        } else if (value.includes('SYKMELDINGSGRAD_FOR_HOY')) {
            return 'Siden du sier at sykmeldingsgraden er for høy er feil må du be den som sykmeldte deg om å skrive en ny sykmelding.';
        } else if (value.includes('SYKMELDINGSGRAD_FOR_LAV')) {
            return 'Du kan fortsatt bruke sykmeldingen. Hvis du ender opp med å jobbe mer enn graden på sykmeldingen sier du fra om det ved utfyllingen av søknaden.';
        }
        return 'Du kan fortsatt bruke sykmeldingen.';
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
                        (val && val.length > 0) || 'Du må svare på hvilke opplysninger som ikke stemmer.',
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
                        feil={(errors.uriktigeOpplysninger?.svar as any)?.message}
                    />
                )}
            />

            {trengerNySykmelding ? (
                <AlertStripeAdvarsel style={{ marginTop: '2rem' }}>{alertstripetekst}</AlertStripeAdvarsel>
            ) : (
                <>
                    {Boolean(watchUriktigeOpplysninger?.svar?.length) && (
                        <AlertStripeInfo style={{ marginTop: '2rem' }}>{alertstripetekst}</AlertStripeInfo>
                    )}
                </>
            )}
        </QuestionWrapper>
    );
};

export default UriktigeOpplysninger;
