import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import { NaermesteLeder } from '../../../../../../models/Arbeidsgiver';
import QuestionWrapper from '../layout/QuestionWrapper';
import AlertStripe from 'nav-frontend-alertstriper';

interface NyNarmesteLederProps {
    naermesteLeder: NaermesteLeder;
}

const NyNarmesteLeder: React.FC<NyNarmesteLederProps> = ({ naermesteLeder }) => {
    const { control, watch, register, unregister, setValue } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'nyNarmesteLeder';
    const sporsmaltekst = `Er det ${naermesteLeder.navn} som skal følge deg opp på jobb mens du er syk?`;
    const watchNyNarmesteLeder = watch(fieldName);

    useEffect(() => {
        register({ name: `${fieldName}.sporsmaltekst`, value: sporsmaltekst });
        register({ name: `${fieldName}.svartekster`, value: JSON.stringify(JaEllerNeiType) });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister, sporsmaltekst]);

    // Reset the answer if the prop changes
    useEffect(() => {
        setValue(`${fieldName}.svar`, undefined);
    }, [naermesteLeder, setValue]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{
                    required: 'Du må svare på om dette er riktig person som skal følge deg opp på jobb når du er syk.',
                }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={[
                            { label: JaEllerNeiType.JA, value: 'JA', id: fieldName },
                            { label: JaEllerNeiType.NEI, value: 'NEI' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchNyNarmesteLeder?.svar === 'JA' && (
                <AlertStripe type="info" form="inline" style={{ marginTop: '0.5rem' }}>
                    Vi sender sykmeldingen til {naermesteLeder.navn}, som finner den ved å logge inn på nav.no
                </AlertStripe>
            )}

            {watchNyNarmesteLeder?.svar === 'NEI' && (
                <AlertStripe type="info" form="inline" style={{ marginTop: '0.5rem' }}>
                    Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                </AlertStripe>
            )}
        </QuestionWrapper>
    );
};

export default NyNarmesteLeder;
