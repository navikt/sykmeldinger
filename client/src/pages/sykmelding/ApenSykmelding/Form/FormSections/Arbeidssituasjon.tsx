import React from 'react';
import { FormInputs, Arbeidssituasjoner } from '../../../../../types/form';
import { FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import { getArbeidsgiverRadios, skalViseFrilansersporsmal, getArbeidssituasjon } from '../../../../../utils/formUtils';
import { Systemtittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Egenmeldingsdager from './Egenmeldingsdager';
import { Arbeidsgiver } from '../../../../../types/arbeidsgiver';
import { Sykmelding } from '../../../../../types/sykmelding';
import './FormSections.less';
import FormInfoMessage from '../Components/FormInfoMessage';

interface ArbeidssituasjonProps {
    sykmelding: Sykmelding;
    erUtenforVentetid: boolean;
    arbeidsgivere: Arbeidsgiver[];
    formState: Partial<FormInputs>;
    errors: Map<keyof FormInputs, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<Partial<FormInputs>>>;
    skalAvbrytes?: boolean;
}

const Arbeidssituasjon = ({
    sykmelding,
    erUtenforVentetid,
    arbeidsgivere,
    formState,
    errors,
    setFormState,
    skalAvbrytes,
}: ArbeidssituasjonProps) => {
    if (skalAvbrytes) {
        return null;
    }

    return (
        <div className="form-section">
            <Systemtittel className="margin-bottom--1">Din arbeidssituasjon</Systemtittel>

            <RadioPanelGruppe
                legend="Hvor er du sykmeldt fra?"
                name="valgtArbeidssituasjon"
                className="panelgruppe"
                feil={errors.get('valgtArbeidssituasjon')?.feilmelding}
                checked={(() => getArbeidssituasjon(formState.valgtArbeidssituasjon, arbeidsgivere))()}
                radios={[
                    ...getArbeidsgiverRadios(arbeidsgivere),
                    {
                        label: 'Jobb som frilanser',
                        value: Arbeidssituasjoner.FRILANSER,
                        id: 'valgtArbeidssituasjon',
                    },
                    {
                        label: 'Jobb som selvstendig næringsdrivende',
                        value: Arbeidssituasjoner.NAERINGSDRIVENDE,
                    },
                    {
                        label: 'Jobb hos annen arbeidsgiver',
                        value: Arbeidssituasjoner.ANNEN_ARBEIDSGIVER,
                    },
                    {
                        label: 'Jeg er arbeidsledig eller permittert',
                        value: Arbeidssituasjoner.ARBEIDSLEDIG,
                    },
                    {
                        label: 'Jeg finner ingenting som passer for meg',
                        value: Arbeidssituasjoner.ANNET,
                    },
                ]}
                onChange={(_event, value: string) => {
                    const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) => value.includes(arbeidsgiver.orgnummer));
                    setFormState(
                        (state): Partial<FormInputs> => ({
                            ...state,
                            valgtArbeidssituasjon: value,
                            valgtArbeidsgiver: arbeidsgiver ? arbeidsgiver : undefined,
                            beOmNyNaermesteLeder: undefined,
                        }),
                    );
                }}
            />

            {formState.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.ARBEIDSTAKER) && (
                <FormInfoMessage
                    message="Vi sender sykmeldingen til bedriftens innboks i Altinn"
                    className="margin-bottom--2"
                />
            )}

            {!!formState.valgtArbeidsgiver && (
                <RadioPanelGruppe
                    name="beOmNyNaermesteLeder"
                    className="panelgruppe"
                    legend={`Er det ${formState.valgtArbeidsgiver.naermesteLeder.navn} som skal følge deg opp når du er syk?`}
                    feil={errors.get('beOmNyNaermesteLeder')?.feilmelding}
                    checked={
                        formState.beOmNyNaermesteLeder
                            ? 'Nei'
                            : formState.beOmNyNaermesteLeder === false
                            ? 'Ja'
                            : undefined
                    }
                    onChange={(_event, value) => {
                        setFormState(
                            (state): Partial<FormInputs> => ({
                                ...state,
                                beOmNyNaermesteLeder: value === 'Nei' ? true : false,
                            }),
                        );
                    }}
                    radios={[
                        { label: 'Ja', value: 'Ja', id: 'beOmNyNaermesteLeder' },
                        { label: 'Nei', value: 'Nei' },
                    ]}
                />
            )}
            {formState.beOmNyNaermesteLeder === false && (
                <FormInfoMessage
                    message={`Vi sender sykmeldingen til ${formState.valgtArbeidsgiver?.naermesteLeder.navn}, som finner den ved å
                    logge inn på nav.no.`}
                />
            )}
            {formState.beOmNyNaermesteLeder === true && (
                <FormInfoMessage message="Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn." />
            )}
            {skalViseFrilansersporsmal(
                formState.valgtArbeidssituasjon,
                erUtenforVentetid,
                sykmelding.sykmeldingsperioder,
            ) && (
                <>
                    <RadioPanelGruppe
                        name="harAnnetFravaer"
                        className="panelgruppe"
                        legend={`Vi har registrert at du ble sykmeldt ${dayjs(sykmelding.syketilfelleStartDato).format(
                            'D. MMM YYYY',
                        )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`}
                        feil={errors.get('harAnnetFravaer')?.feilmelding}
                        checked={
                            formState.harAnnetFravaer ? 'Ja' : formState.harAnnetFravaer === false ? 'Nei' : undefined
                        }
                        onChange={(_event, value) => {
                            setFormState(
                                (state): Partial<FormInputs> => ({
                                    ...state,
                                    harAnnetFravaer: value === 'Ja' ? true : false,
                                    fravaersperioder: undefined,
                                }),
                            );
                        }}
                        radios={[
                            { label: 'Ja', value: 'Ja', id: 'harAnnetFravaer' },
                            { label: 'Nei', value: 'Nei' },
                        ]}
                    />

                    {formState.harAnnetFravaer && (
                        <Egenmeldingsdager
                            formState={formState}
                            setFormState={setFormState}
                            sykmeldingStartdato={sykmelding.syketilfelleStartDato}
                            feil={errors.get('fravaersperioder')?.feilmelding}
                        />
                    )}

                    <RadioPanelGruppe
                        name="harForsikring"
                        className="panelgruppe"
                        legend="Har du forsikring som gjelder de første 16 dagene av sykefraværet?"
                        feil={errors.get('harForsikring')?.feilmelding}
                        checked={formState.harForsikring ? 'Ja' : formState.harForsikring === false ? 'Nei' : undefined}
                        onChange={(_event, value) => {
                            setFormState(
                                (state): Partial<FormInputs> => ({
                                    ...state,
                                    harForsikring: value === 'Ja' ? true : false,
                                }),
                            );
                        }}
                        radios={[
                            { label: 'Ja', value: 'Ja', id: 'harForsikring' },
                            { label: 'Nei', value: 'Nei' },
                        ]}
                    />
                </>
            )}
        </div>
    );
};

export default Arbeidssituasjon;
