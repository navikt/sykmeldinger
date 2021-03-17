import React, { useContext, useEffect } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Sykmelding } from '../../../../../types/sykmelding';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from '../../../../commonComponents/Spinner/Spinner';
import useBrukerinformasjon from '../../../../commonComponents/hooks/useBrukerinformasjon';
import useSykmeldingUtenforVentetid from '../../../../commonComponents/hooks/useSykmeldingUtenforVentetid';
import useBekreft from '../../../../commonComponents/hooks/useBekreft';
import useSend from '../../../../commonComponents/hooks/useSend';
import { AvbrytContext } from '../AvbrytContext';
import { useForm, FormProvider } from 'react-hook-form';
import ErOpplysningeneRiktige from './formComponents/ErOpplysningeneRiktige';

export interface Egenmeldingsperiode {
    fom: Date;
    tom: Date;
}

export enum UriktigeOpplysningerType {
    PERIODE = 'Periode',
    SYKMELDINGSGRAD_FOR_HOY = 'Sykmeldingsgraden er for høy',
    SYKMELDINGSGRAD_FOR_LAV = 'Sykmeldingsgraden er for lav',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    ANDRE_OPPLYSNINGER = 'Andre opplysninger',
}

export enum ArbeidssituasjonType {
    ARBEIDSTAKER = 'Arbeidstaker',
    FRILANSER = 'Frilanser',
    SELVSTENDIG_NARINGSDRIVENDE = 'Selvstendig næringsdrivende',
    ARGBEIDSLEDIG = 'Arbeidsledig',
    PERMITTERT = 'Permittert',
    ANNET = 'Annet',
}

export enum JaEllerNeiType {
    JA = 'Ja',
    NEI = 'Nei',
}

interface SporsmalSvar<Value> {
    sporsmaltekst?: string;
    svartekster?: string;
    svar?: Value;
}

export interface FormData {
    erOpplysnigeneRiktige?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    uriktigeOpplysninger?: SporsmalSvar<(keyof typeof UriktigeOpplysningerType)[]>;
    arbeidssituasjon?: SporsmalSvar<keyof typeof ArbeidssituasjonType>;
    arbeidsgiverOrgnummer?: SporsmalSvar<string>;
    nyNarmesteLeder?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    harBruktEgenmelding?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    egenmeldingsperioder?: SporsmalSvar<Egenmeldingsperiode[]>;
    harForsikring?: SporsmalSvar<keyof typeof JaEllerNeiType>;
}

interface FormProps {
    sykmelding: Sykmelding;
}

const Form: React.FC<FormProps> = ({ sykmelding }) => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    // DATA FETCHING
    const {
        isLoading: isLoadingBrukerinformasjon,
        error: errorBrukerinformasjon,
        data: brukerinformasjon,
    } = useBrukerinformasjon();

    const {
        isLoading: isLoadingSykmeldingUtenforVentetid,
        error: errorSykmeldingUtenforVentetid,
        data: sykmeldingUtenforVentetid,
    } = useSykmeldingUtenforVentetid(sykmeldingId);

    // DATA PERSISTING
    const { mutate: bekreft, isLoading: isLoadingBekreft, error: errorBekreft } = useBekreft(sykmeldingId);
    const { mutate: send, isLoading: isLoadingSend, error: errorSend } = useSend(sykmeldingId);

    const formMethods = useForm<FormData>({ shouldFocusError: false });
    const { handleSubmit, watch, errors } = formMethods;
    const watchArbeidssituasjon = watch('arbeidssituasjon');
    const skalSendes = watchArbeidssituasjon === 'ARBEIDSTAKER';

    const { maAvbryte } = useContext(AvbrytContext);

    console.log(watch());

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const feiloppsummeringsfeil: FeiloppsummeringFeil[] = Object.entries(errors).map(([key, value], index) => ({
        skjemaelementId: key,
        feilmelding: (value as any)?.message,
        key: index,
    }));

    if (isLoadingBrukerinformasjon || isLoadingSykmeldingUtenforVentetid) {
        return <Spinner headline="Henter arbeidsforhold" />;
    }

    if (
        errorBrukerinformasjon ||
        errorSykmeldingUtenforVentetid ||
        brukerinformasjon === undefined ||
        sykmeldingUtenforVentetid === undefined
    ) {
        return <div>Error</div>;
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="apen-sykmelding-form"
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    skalSendes ? send(data) : bekreft(data);
                })}
            >
                <ErOpplysningeneRiktige
                    erUtenforVentetid={sykmeldingUtenforVentetid}
                    brukerinformasjon={brukerinformasjon}
                />

                {(errorSend || errorBekreft) && (
                    <div className="margin-bottom--1">
                        <AlertStripeFeil>
                            En feil oppsto ved {skalSendes ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst prøv
                            igjen senere.
                        </AlertStripeFeil>
                    </div>
                )}

                {Boolean(Object.keys(errors).length) && (
                    <Feiloppsummering tittel="For å gå videre må du rette opp følgende" feil={feiloppsummeringsfeil} />
                )}

                {maAvbryte === false && (
                    <div className="margin-bottom--2 text--center">
                        <Knapp spinner={isLoadingSend || isLoadingBekreft} type="hoved" htmlType="submit">
                            {skalSendes ? 'Send' : 'Bekreft'} sykmelding
                        </Knapp>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
