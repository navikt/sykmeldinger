import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import Egenmeldingsperioder from './Egenmeldingsperioder';
import QuestionWrapper from '../layout/QuestionWrapper';
import dayjs from 'dayjs';
import Ekspanderbar from '../../../../../commonComponents/Ekspanderbar/Ekspanderbar';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Spacing from '../../../../../commonComponents/Spacing/Spacing';

interface HarBruktEgenmeldingProps {
    oppfolgingsdato: Date;
}

const HarBruktEgenmelding: React.FC<HarBruktEgenmeldingProps> = ({ oppfolgingsdato }) => {
    const { control, watch, errors, register, unregister } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'harBruktEgenmelding';
    const sporsmaltekst = `Vi har registrert at du ble syk ${dayjs(oppfolgingsdato).format(
        'D. MMMM YYYY',
    )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`;
    const watchHarBruktEgenmelding = watch(fieldName);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(JaEllerNeiType),
        });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister, sporsmaltekst]);

    return (
        <QuestionWrapper>
            <Spacing amount="x-small">
                <Systemtittel tag="h2">Fravær før sykmeldingen</Systemtittel>
            </Spacing>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{ required: 'Du må svare på om du har brukt hatt annet fravær' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <Ekspanderbar title="Hva betyr dette?">
                                    <Spacing amount="x-small">
                                        <Normaltekst>
                                            Vi trenger denne informasjonen for å vite hvem som skal utbetale hva.
                                        </Normaltekst>
                                    </Spacing>
                                    <Spacing amount="small">
                                        <Normaltekst>
                                            Siden vi ikke får tak i informasjonen automatisk, må vi få disse
                                            opplysningene fra deg.
                                        </Normaltekst>
                                    </Spacing>
                                    <Spacing amount="x-small">
                                        <Element>Med fravær mener vi</Element>
                                    </Spacing>
                                    <ul>
                                        <li>
                                            <Normaltekst>egenmelding</Normaltekst>
                                        </li>
                                        <li>
                                            <Normaltekst>papirsykmelding</Normaltekst>
                                        </li>
                                        <li>
                                            <Normaltekst>ferie</Normaltekst>
                                        </li>
                                        <li>
                                            <Normaltekst>permisjon</Normaltekst>
                                        </li>
                                        <li>
                                            <Normaltekst>
                                                sykmelding fra et annet arbeidsforhold i samme bedrift
                                            </Normaltekst>
                                        </li>
                                    </ul>
                                </Ekspanderbar>
                            </div>
                        }
                        radios={[
                            { label: JaEllerNeiType.JA, value: 'JA', id: fieldName },
                            { label: JaEllerNeiType.NEI, value: 'NEI' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.harBruktEgenmelding?.svar?.message}
                    />
                )}
            />

            {watchHarBruktEgenmelding?.svar === 'JA' && <Egenmeldingsperioder oppfolgingsdato={oppfolgingsdato} />}
        </QuestionWrapper>
    );
};

export default HarBruktEgenmelding;
