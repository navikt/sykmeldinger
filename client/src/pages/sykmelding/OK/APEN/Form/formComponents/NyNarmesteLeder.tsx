import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import { NaermesteLeder } from '../../../../../../types/arbeidsgiver';
import QuestionWrapper from '../layout/QuestionWrapper';

interface NyNarmesteLederProps {
    naermesteLeder: NaermesteLeder;
}

const NyNarmesteLeder: React.FC<NyNarmesteLederProps> = ({ naermesteLeder }) => {
    const { control, watch } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'nyNarmesteLeder';
    const watchNyNarmesteLeder = watch(fieldName);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={fieldName}
                defaultValue={null}
                rules={{ required: 'er nærmeste leder riktig?' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={`Er det ${naermesteLeder.navn} som skal følge deg opp på jobb mens du er syk?`}
                        radios={[
                            { label: 'Ja', value: 'JA', id: fieldName },
                            { label: 'Nei', value: 'NEI' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchNyNarmesteLeder === 'JA' && (
                <div>Vi sender sykmeldingen til {naermesteLeder.navn}, som finner den ved å logge inn på nav.no</div>
            )}

            {watchNyNarmesteLeder === 'NEI' && (
                <div>Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.</div>
            )}
        </QuestionWrapper>
    );
};

export default NyNarmesteLeder;
