import React, { useContext } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from '../../../../commonComponents/Spinner/Spinner';
import useBrukerinformasjon from '../../../../../hooks/useBrukerinformasjon';
import useSykmeldingUtenforVentetid from '../../../../../hooks/useSykmeldingUtenforVentetid';
import useSend from '../../../../../hooks/useSend';
import { AvbrytContext } from '../AvbrytContext';
import { useForm, FormProvider } from 'react-hook-form';
import ErOpplysningeneRiktige from './formComponents/ErOpplysningeneRiktige';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import Arbeidssituasjon from './formComponents/Arbeidssituasjon';
import Sykmeldingsopplysninger from '../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

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

export interface FormShape {
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
    const { mutate: send, isLoading: isSending, error: errorSend } = useSend(sykmeldingId);

    const formMethods = useForm<FormShape>({ shouldFocusError: false });
    const { handleSubmit, watch, errors } = formMethods;

    const erArbeidstaker = watch('arbeidssituasjon')?.svar === 'ARBEIDSTAKER';
    const erArbeidstakerMedStrengtFortroligAdressse =
        erArbeidstaker && brukerinformasjon?.strengtFortroligAdresse === true;
    const watchErOpplysningeneRiktige = watch('erOpplysnigeneRiktige');

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
        return (
            <AlertStripeFeil style={{ marginBottom: '2rem' }}>
                Det oppsto en feil ved henting av av skjemadata. Du kan dessverre ikke ta i bruk sykmeldingen akkurat
                nå. Prøv igjen senere
            </AlertStripeFeil>
        );
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="apen-sykmelding-form"
                style={{ marginBottom: '3rem' }}
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    send(data);
                })}
            >
                <ErOpplysningeneRiktige />

                {Boolean(watchErOpplysningeneRiktige?.svar) && maAvbryte === false && (
                    <Arbeidssituasjon
                        erUtenforVentetid={sykmeldingUtenforVentetid.erUtenforVentetid}
                        brukerinformasjon={brukerinformasjon}
                    />
                )}

                {erArbeidstaker && !brukerinformasjon.strengtFortroligAdresse && (
                    <div style={{ marginTop: '2rem' }}>
                        <Sykmeldingsopplysninger
                            id="arbeidsgivers-sykmeldingsopplysninger"
                            title="Slik ser sykmeldingen ut for arbeidsgiveren din"
                            sykmelding={sykmelding}
                            arbeidsgiver
                        />
                    </div>
                )}

                {errorSend && (
                    <div style={{ marginBottom: '1rem' }}>
                        <AlertStripeFeil>
                            En feil oppsto ved {erArbeidstaker ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst prøv
                            igjen senere.
                        </AlertStripeFeil>
                    </div>
                )}

                <FeiloppsummeringContainer errors={errors} />

                {maAvbryte === false && !erArbeidstakerMedStrengtFortroligAdressse && (
                    <div style={{ marginTop: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
                        <Knapp spinner={isSending} type="hoved" htmlType="submit">
                            {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding
                        </Knapp>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
