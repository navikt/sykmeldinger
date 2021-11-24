import React, { useContext } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from '../../../../../components/Spinner/Spinner';
import useBrukerinformasjon from '../../../../../hooks/useBrukerinformasjon';
import useSykmeldingUtenforVentetid from '../../../../../hooks/useSykmeldingUtenforVentetid';
import useSend from '../../../../../hooks/useSend';
import { AvbrytContext } from '../AvbrytContext';
import { useForm, FormProvider } from 'react-hook-form';
import StemmerOpplysningene from './formComponents/StemmerOpplysningene';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import Arbeidssituasjon from './formComponents/Arbeidssituasjon';
import Sykmeldingsopplysninger from '../../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../../components/Spacing/Spacing';
import VeilederMaleSvg from '../../../../../components/Veileder/svg/VeilederMaleSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './Form.less';
import Veileder from 'nav-frontend-veileder';

export interface Egenmeldingsperiode {
    fom: string;
    tom: string;
}

export enum UriktigeOpplysningerType {
    PERIODE = 'Periode',
    SYKMELDINGSGRAD_FOR_LAV = 'Sykmeldingsgraden er for lav',
    SYKMELDINGSGRAD_FOR_HOY = 'Sykmeldingsgraden er for høy',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    ANDRE_OPPLYSNINGER = 'Andre opplysninger',
}

export enum ArbeidssituasjonType {
    ANSATT = 'ansatt',
    FRILANSER = 'frilanser',
    NAERINGSDRIVENDE = 'selvstendig næringsdrivende',
    ARBEIDSLEDIG = 'arbeidsledig eller permittert',
    ANNET = 'annet',
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
    stemmerOpplysningene?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    uriktigeOpplysninger?: SporsmalSvar<(keyof typeof UriktigeOpplysningerType)[]>;
    arbeidssituasjon?: SporsmalSvar<keyof typeof ArbeidssituasjonType>;
    arbeidsgiverOrgnummer?: SporsmalSvar<string>;
    riktigNarmesteLeder?: SporsmalSvar<keyof typeof JaEllerNeiType>;
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

    const erAnsatt = watch('arbeidssituasjon')?.svar === 'ANSATT';
    const erAnsattMedStrengtFortroligAdressse =
        erAnsatt && brukerinformasjon?.strengtFortroligAdresse === true;
    const harValgtArbeidsgiver = !!watch('arbeidsgiverOrgnummer')?.svar;

    const watchStemmerOpplysningene = watch('stemmerOpplysningene');

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
                <AlertStripeFeil role="alert" aria-live="polite">
                    Vi klarte dessverre ikke å hente opp informasjonen som trengs for at du kan bruke sykmeldingen.
                    Vennligst prøv igjen senere.
                </AlertStripeFeil>
            </Spacing>
        );
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="apen-sykmelding-form"
                onSubmit={handleSubmit((data) => {
                    send(data);
                })}
            >
                <Spacing>
                    <StemmerOpplysningene />

                    {Boolean(watchStemmerOpplysningene?.svar) && maAvbryte === false && (
                        <Arbeidssituasjon
                            harAvventendePeriode={sykmelding.sykmeldingsperioder.some(
                                (sm) => sm.type === 'AVVENTENDE',
                            )}
                            erUtenforVentetid={sykmeldingUtenforVentetid}
                            brukerinformasjon={brukerinformasjon}
                            sykmeldingFom={sykmelding.getSykmeldingStartDate()}
                        />
                    )}

                    {erAnsatt && harValgtArbeidsgiver && !brukerinformasjon.strengtFortroligAdresse && (
                        <div className="har-valgt-arbeidsgiver-wrapper">
                            <div className="veileder-sender-sykmeldingen">
                                <Veileder storrelse="S" fargetema="info"><VeilederMaleSvg /></Veileder>
                                <div>
                                    <Element>Vi sender sykmeldingen til arbeidsgiverens innboks i Altinn</Element>
                                    <Normaltekst>
                                        Under ser du hva arbeidsgiveren din får se hvis du sender sykmeldingen. Det er
                                        bare disse opplysningene som blir sendt. Arbeidsgiveren din får for eksempel
                                        ikke se diagnosen.
                                    </Normaltekst>
                                </div>
                            </div>
                            <Spacing amount="small">
                                <Sykmeldingsopplysninger sykmelding={sykmelding} arbeidsgiver />
                            </Spacing>
                            <Spacing amount="large">
                                <Ekspanderbartpanel tittel="Hvis du ikke ønsker å sende sykmeldingen til arbeidsgiver">
                                    <Spacing amount="small">
                                        <Normaltekst>
                                            Arbeidsgiveren din trenger sykmeldingen som dokumentasjon på at du er syk,
                                            enten den digitale sykmeldingen du finner her, eller papirsykmeldingen som
                                            du kan få hos legen.
                                        </Normaltekst>
                                    </Spacing>
                                    <Normaltekst>
                                        Ønsker du ikke å sende den slik du ser den her, kan du snakke med legen om å få
                                        en ny sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen
                                        til arbeidsgiveren din i stedet.
                                    </Normaltekst>
                                </Ekspanderbartpanel>
                            </Spacing>
                        </div>
                    )}

                    {errorSend && (
                        <Spacing amount="small">
                            <AlertStripeFeil role="alert" aria-live="polite">
                                {errorSend.message}
                            </AlertStripeFeil>
                        </Spacing>
                    )}
                </Spacing>

                <Spacing>
                    <FeiloppsummeringContainer errors={errors} />
                </Spacing>

                {maAvbryte === false && !erAnsattMedStrengtFortroligAdressse && (
                    <Spacing>
                        <div style={{ textAlign: 'center' }}>
                            <Knapp disabled={isSending} spinner={isSending} type="hoved" htmlType="submit">
                                {erAnsatt ? 'Send' : 'Bekreft'} sykmelding
                            </Knapp>
                        </div>
                    </Spacing>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
