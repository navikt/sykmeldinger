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
import Spacing from '../../../../commonComponents/Spacing/Spacing';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

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
    ARBEIDSLEDIG = 'Arbeidsledig',
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
        return (
            <Spacing amount="large">
                <Spinner headline="Henter arbeidsforhold" />
            </Spacing>
        );
    }

    if (
        errorBrukerinformasjon ||
        errorSykmeldingUtenforVentetid ||
        brukerinformasjon === undefined ||
        sykmeldingUtenforVentetid === undefined
    ) {
        return (
            <Spacing>
                <AlertStripeFeil>
                    Det oppsto en feil ved henting av av skjemadata. Du kan dessverre ikke ta i bruk sykmeldingen
                    akkurat nå. Prøv igjen senere
                </AlertStripeFeil>
            </Spacing>
        );
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="apen-sykmelding-form"
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    send(data);
                })}
            >
                <Spacing>
                    <Spacing>
                        <ErOpplysningeneRiktige />

                        {Boolean(watchErOpplysningeneRiktige?.svar) && maAvbryte === false && (
                            <Arbeidssituasjon
                                erUtenforVentetid={sykmeldingUtenforVentetid.erUtenforVentetid}
                                brukerinformasjon={brukerinformasjon}
                            />
                        )}
                    </Spacing>

                    {erArbeidstaker && !brukerinformasjon.strengtFortroligAdresse && (
                        <>
                            <Spacing>
                                <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                                    <Element>Vi sender sykmeldingen til bedriftens innboks i Altinn</Element>
                                    <Normaltekst>
                                        Under ser du hva arbeidsgiveren din får se hvis du sender sykmeldingen. Det er
                                        bare disse opplysningene som blir sendt. Arbeidsgiveren din får for eksempel
                                        ikke se diagnosen.
                                    </Normaltekst>
                                </Veilederpanel>
                            </Spacing>
                            <Spacing>
                                <Sykmeldingsopplysninger
                                    id="arbeidsgivers-sykmeldingsopplysninger"
                                    title="Slik ser sykmeldingen ut for arbeidsgiveren din"
                                    sykmelding={sykmelding}
                                    arbeidsgiver
                                />
                            </Spacing>
                            <Spacing>
                                <Ekspanderbartpanel tittel="Om du ikke ønsker å sende sykmeldingen til arbeidsgiver">
                                    <Normaltekst>
                                        Arbeidsgiveren din trenger sykmeldingen som dokumentasjon på at du er syk, enten
                                        den digitale sykmeldingen du finner her, eller papirsykmeldingen som du kan få
                                        hos legen.
                                    </Normaltekst>
                                    <Normaltekst>
                                        Ønsker du ikke å sende den slik du ser den her, kan du snakke med legen om å få
                                        en ny sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen
                                        til arbeidsgiveren din i stedet.
                                    </Normaltekst>
                                </Ekspanderbartpanel>
                            </Spacing>
                        </>
                    )}

                    {errorSend && (
                        <Spacing amount="small">
                            <AlertStripeFeil>
                                En feil oppsto ved {erArbeidstaker ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst
                                prøv igjen senere.
                            </AlertStripeFeil>
                        </Spacing>
                    )}
                </Spacing>

                <Spacing>
                    <FeiloppsummeringContainer errors={errors} />
                </Spacing>

                {maAvbryte === false && !erArbeidstakerMedStrengtFortroligAdressse && (
                    <Spacing>
                        <div style={{ textAlign: 'center' }}>
                            <Knapp spinner={isSending} type="hoved" htmlType="submit">
                                {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding
                            </Knapp>
                        </div>
                    </Spacing>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
