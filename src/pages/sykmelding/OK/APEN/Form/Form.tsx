import React, { useContext } from 'react';
import { Knapp } from 'nav-frontend-knapper';
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
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import Arbeidssituasjon from './formComponents/Arbeidssituasjon';

export interface Egenmeldingsperiode {
    fom: string;
    tom: string;
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
    const watchErOpplysningeneRiktige = watch('erOpplysnigeneRiktige');

    const skalSendes = watchArbeidssituasjon === 'ARBEIDSTAKER';

    const { maAvbryte } = useContext(AvbrytContext);

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
                style={{ marginBottom: '3rem' }}
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    skalSendes ? send(data) : bekreft(data);
                })}
            >
                <ErOpplysningeneRiktige />

                {Boolean(watchErOpplysningeneRiktige?.svar) && maAvbryte === false && (
                    <Arbeidssituasjon
                        erUtenforVentetid={sykmeldingUtenforVentetid}
                        brukerinformasjon={brukerinformasjon}
                    />
                )}

                {(errorSend || errorBekreft) && (
                    <div className="margin-bottom--1">
                        <AlertStripeFeil>
                            En feil oppsto ved {skalSendes ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst prøv
                            igjen senere.
                        </AlertStripeFeil>
                    </div>
                )}

                <FeiloppsummeringContainer errors={errors} />

                {maAvbryte === false && (
                    <div style={{ marginTop: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
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
