import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import { NaermesteLeder } from '../../../../../../models/Arbeidsgiver';
import QuestionWrapper from '../layout/QuestionWrapper';
import AlertStripe from 'nav-frontend-alertstriper';
import Spacing from '../../../../../commonComponents/Spacing/Spacing';
import Ekspanderbar from '../../../../../commonComponents/Ekspanderbar/Ekspanderbar';

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
        setValue(`${fieldName}.svar`, null);
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
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <Ekspanderbar title="Mer om oppfolging">
                                    Personen som er oppgitt her vil få se sykmeldingen ved å logge seg på nav.no, og kan
                                    bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det. Hør med
                                    arbeidsgiveren din om du er usikker på om personen er riktig.
                                </Ekspanderbar>
                            </div>
                        }
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
                <Spacing direction="top" amount="small">
                    <AlertStripe type="info">
                        Vi sender sykmeldingen til {naermesteLeder.navn}, som finner den ved å logge inn på nav.no
                    </AlertStripe>
                </Spacing>
            )}

            {watchNyNarmesteLeder?.svar === 'NEI' && (
                <Spacing direction="top" amount="small">
                    <AlertStripe type="info">
                        Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                    </AlertStripe>
                </Spacing>
            )}
        </QuestionWrapper>
    );
};

export default NyNarmesteLeder;
