import React, { useContext } from 'react';
import { Button, Loader } from '@navikt/ds-react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useForm, FormProvider } from 'react-hook-form';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';

import { getSykmeldingStartDate, Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import Spinner from '../../../../Spinner/Spinner';
import useBrukerinformasjon from '../../../../../hooks/useBrukerinformasjon';
import useSykmeldingUtenforVentetid from '../../../../../hooks/useSykmeldingUtenforVentetid';
import useSend from '../../../../../hooks/useSend';
import { AvbrytContext } from '../AvbrytContext';
import Sykmeldingsopplysninger from '../../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../../Spacing/Spacing';
import VeilederMaleSvg from '../../../../Veileder/svg/VeilederMaleSvg';
import useGetSykmeldingIdParam from '../../../../../hooks/useGetSykmeldingIdParam';
import { Periodetype } from '../../../../../models/Sykmelding/Periode';

import ErOpplysningeneRiktige from './formComponents/ErOpplysningeneRiktige';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import Arbeidssituasjon from './formComponents/Arbeidssituasjon';
import styles from './Form.module.css';

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
    ARBEIDSTAKER = 'ansatt',
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
    erOpplysningeneRiktige?: SporsmalSvar<keyof typeof JaEllerNeiType>;
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
    disable: boolean;
}

const Form: React.FC<FormProps> = ({ sykmelding, disable }) => {
    const sykmeldingId = useGetSykmeldingIdParam();

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
    const harValgtArbeidsgiver = !!watch('arbeidsgiverOrgnummer')?.svar;

    const watchErOpplysningeneRiktige = watch('erOpplysningeneRiktige');

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
                    <ErOpplysningeneRiktige disable={disable} />

                    {Boolean(watchErOpplysningeneRiktige?.svar) && !maAvbryte && (
                        <Arbeidssituasjon
                            harAvventendePeriode={sykmelding.sykmeldingsperioder.some(
                                (sm) => sm.type === Periodetype.AVVENTENDE,
                            )}
                            erUtenforVentetid={sykmeldingUtenforVentetid}
                            brukerinformasjon={brukerinformasjon}
                            sykmeldingFom={getSykmeldingStartDate(sykmelding)}
                        />
                    )}

                    {erArbeidstaker && harValgtArbeidsgiver && !brukerinformasjon.strengtFortroligAdresse && (
                        <div className={styles.harValgtArbeidsgiverWrapper}>
                            <div className={styles.veilederSenderSykmeldingen}>
                                <Veileder className={styles.navVeileder} storrelse="S" fargetema="info">
                                    <VeilederMaleSvg />
                                </Veileder>
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
                                <Sykmeldingsopplysninger
                                    sykmelding={sykmelding}
                                    arbeidsgiver
                                    expandable={true}
                                    sendeSykmelding
                                />
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

                {!maAvbryte && !erArbeidstakerMedStrengtFortroligAdressse && (
                    <Spacing>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                className={styles.sendBekreftButton}
                                disabled={isSending || disable}
                                variant="primary"
                                type="submit"
                            >
                                {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding {isSending && <Loader />}
                            </Button>
                        </div>
                    </Spacing>
                )}
            </form>
        </FormProvider>
    );
};

export default Form;
