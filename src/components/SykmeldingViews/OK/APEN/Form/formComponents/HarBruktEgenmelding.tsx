import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { BodyShort, Heading, Label, Radio, RadioGroup, ReadMore } from '@navikt/ds-react';

import QuestionWrapper from '../layout/QuestionWrapper';
import { FormShape, JaEllerNeiType } from '../Form';
import Spacing from '../../../../../Spacing/Spacing';

import Egenmeldingsperioder from './Egenmeldingsperioder';

interface HarBruktEgenmeldingProps {
    oppfolgingsdato: string;
}

const fieldName = 'harBruktEgenmelding';

const HarBruktEgenmelding: React.FC<HarBruktEgenmeldingProps> = ({ oppfolgingsdato }) => {
    const { control, watch, register, unregister } = useFormContext<FormShape>();
    const watchHarBruktEgenmelding = watch(fieldName);
    const sporsmaltekst = `Vi har registrert at du ble syk ${dayjs(oppfolgingsdato).format(
        'D. MMMM YYYY',
    )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`;

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        });
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify(JaEllerNeiType),
        });

        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister, sporsmaltekst]);

    return (
        <QuestionWrapper>
            <Spacing amount="x-small">
                <Heading size="medium">Fravær før sykmeldingen</Heading>
            </Spacing>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding eller annen sykmelding før du ble syk.',
                }}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <ReadMore header="Hva betyr dette?">
                                    <div>
                                        <BodyShort spacing>
                                            Vi trenger denne informasjonen for å vite hvem som skal utbetale hva.
                                        </BodyShort>
                                        <BodyShort spacing>
                                            Siden vi ikke får tak i informasjonen automatisk, må vi få disse
                                            opplysningene fra deg.
                                        </BodyShort>
                                        <Label spacing>Med fravær mener vi</Label>
                                        <ul>
                                            <li>
                                                <BodyShort>egenmelding</BodyShort>
                                            </li>
                                            <li>
                                                <BodyShort>papirsykmelding</BodyShort>
                                            </li>
                                            <li>
                                                <BodyShort>ferie</BodyShort>
                                            </li>
                                            <li>
                                                <BodyShort>permisjon</BodyShort>
                                            </li>
                                            <li>
                                                <BodyShort>
                                                    sykmelding fra et annet arbeidsforhold i samme bedrift
                                                </BodyShort>
                                            </li>
                                        </ul>
                                    </div>
                                </ReadMore>
                            </div>
                        }
                        onChange={(value: 'JA' | 'NEI') => field.onChange(value)}
                        error={fieldState.error?.message}
                    >
                        <Radio value="JA">Ja</Radio>
                        <Radio value="NEI">Nei</Radio>
                    </RadioGroup>
                )}
            />

            {watchHarBruktEgenmelding?.svar === 'JA' && <Egenmeldingsperioder oppfolgingsdato={oppfolgingsdato} />}
        </QuestionWrapper>
    );
};

export default HarBruktEgenmelding;
