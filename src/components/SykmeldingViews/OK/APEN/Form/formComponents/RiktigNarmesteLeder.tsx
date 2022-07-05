import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Alert } from '@navikt/ds-react';

import { FormShape, JaEllerNeiType } from '../Form';
import { NaermesteLederFragment } from '../../../../../../fetching/graphql.generated';
import QuestionWrapper from '../layout/QuestionWrapper';
import Spacing from '../../../../../Spacing/Spacing';
import Ekspanderbar from '../../../../../Ekspanderbar/Ekspanderbar';

interface RiktigNarmesteLederProps {
    naermesteLeder: NaermesteLederFragment;
}

function RiktigNarmesteLeder({ naermesteLeder }: RiktigNarmesteLederProps): JSX.Element {
    const { control, watch, register, unregister, setValue } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'riktigNarmesteLeder';
    const sporsmaltekst = `Er det ${naermesteLeder.navn} som skal følge deg opp på jobben mens du er syk?`;
    const watchRiktigNarmesteLeder = watch(fieldName);

    useEffect(() => {
        register({ name: `${fieldName}.sporsmaltekst`, value: sporsmaltekst });
        register({ name: `${fieldName}.svartekster`, value: JSON.stringify(JaEllerNeiType) });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister, sporsmaltekst]);

    // Reset the answer if the prop changes
    useEffect(() => {
        setValue(`${fieldName}.svar`, null);
    }, [naermesteLeder, setValue]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{
                    required:
                        'Du må svare på om dette er riktig person som skal følge deg opp på jobben når du er syk.',
                }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <Ekspanderbar title="Les om hva det innebærer">
                                    Den vi spør om, vil få se sykmeldingen din og kan bli kontaktet av NAV underveis i
                                    sykefraværet. Hør med arbeidsgiveren din hvis du mener det er en annen de skulle
                                    meldt inn i stedet.
                                </Ekspanderbar>
                            </div>
                        }
                        radios={[
                            { label: JaEllerNeiType.JA, value: 'JA', id: fieldName },
                            { label: JaEllerNeiType.NEI, value: 'NEI' },
                        ]}
                        checked={value}
                        // TODO type better
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchRiktigNarmesteLeder?.svar === 'JA' && (
                <Spacing direction="top" amount="small">
                    <Alert variant="info" role="alert" aria-live="polite">
                        Vi sender sykmeldingen til {naermesteLeder.navn}, som finner den ved å logge inn på nav.no
                    </Alert>
                </Spacing>
            )}

            {watchRiktigNarmesteLeder?.svar === 'NEI' && (
                <Spacing direction="top" amount="small">
                    <Alert variant="info" role="alert" aria-live="polite">
                        Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                    </Alert>
                </Spacing>
            )}
        </QuestionWrapper>
    );
}

export default RiktigNarmesteLeder;
