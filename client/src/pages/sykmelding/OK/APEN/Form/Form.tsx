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

export interface FormData {
    erOpplysnigeneRiktige?: 'JA' | 'NEI';
    uriktigeOpplysninger?: (keyof typeof UriktigeOpplysningerType)[];
    arbeidssituasjon?: keyof typeof ArbeidssituasjonType;
    arbeidsgiverOrgnummer?: string;
    nyNarmesteLeder?: 'JA' | 'NEI';
    harBruktEgenmelding?: 'JA' | 'NEI';
    egenmeldingsperioder?: Egenmeldingsperiode[];
    harForsikring?: 'JA' | 'NEI';
}

interface FormProps {
    sykmelding: Sykmelding;
}

const Form: React.FC<FormProps> = () => {
    const { sykmeldingId } = useParams();

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

    const { mutate: bekreft, isLoading: isLoadingBekreft, error: errorBekreft } = useBekreft(sykmeldingId);
    const { mutate: send, isLoading: isLoadingSend, error: errorSend } = useSend(sykmeldingId);

    const formMethods = useForm<FormData>();
    const { handleSubmit, watch } = formMethods;

    const watchArbeidssituasjon = watch('arbeidssituasjon');
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
