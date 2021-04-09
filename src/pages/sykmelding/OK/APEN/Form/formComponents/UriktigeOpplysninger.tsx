import React, { useMemo, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'nav-frontend-skjema';
import { FormShape, UriktigeOpplysningerType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';
import { AvbrytContext } from '../../AvbrytContext';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';

const UriktigeOpplysninger: React.FC = () => {
    const { register, unregister, watch } = useFormContext<FormShape>();
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
        if (value === undefined) {
            return undefined;
        } else if (value.includes('PERIODE')) {
            return 'Siden du sier at perioden er feil må du be den som sykmeldte deg om å skrive en ny sykmelidng.';
        } else if (value.includes('SYKMELDINGSGRAD_FOR_HOY')) {
            return 'Siden du sier at sykmeldingsgraden er for høy er feil må du be den som sykmeldte deg om å skrive en ny sykmelidng.';
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
            name: 'uriktigeOpplysninger.sporsmal',
            value: 'Hvilke opplysninger stemmer ikke?',
        });
        register({
            name: 'uriktigeOpplysninger.svartekster',
            value: JSON.stringify(UriktigeOpplysningerType),
        });
        return () => {
            unregister(fieldName);
            setMaAvbryte(false);
        };
    }, [register, unregister, setMaAvbryte]);

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
