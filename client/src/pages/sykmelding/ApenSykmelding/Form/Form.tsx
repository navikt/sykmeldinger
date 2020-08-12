import React, { useState } from 'react';
import useForm from '../../../commonComponents/hooks/useForm';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../types/sykmelding';
import { Arbeidsgiver } from '../../../../types/arbeidsgiver';
import validationFunctions from './formValidation';
import { FormInputs } from '../../../../types/form';
import BekreftOpplysninger from './FormSections/BekreftOpplysninger';
import Arbeidssituasjon from './FormSections/Arbeidssituasjon';
import AvbrytPanel from '../../components/AvbrytPanel/AvbrytPanel';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import SykmeldingPerioder from '../../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import ArbeidsuforSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import ElementMedTekst from '../../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import EtikettMedTekst from '../../components/Sykmeldingsopplysninger/layout/EtikettMedTekst';

import sladd from '../../SendtSykmelding/sladd.svg';
import { useParams } from 'react-router-dom';
import useFetch, { areAnyPending, areAnyPendingOrFinished } from '../../../commonComponents/hooks/useFetch';
import usePoll from '../../../commonComponents/hooks/useInterval';
import { AlertStripeFeil, AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface FormProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    erUtenforVentetid: boolean;
    fetchSykmelding: (request?: RequestInit | undefined) => void;
    fetchSoknader: (request?: RequestInit | undefined) => void;
}

const Form = ({ sykmelding, arbeidsgivere, erUtenforVentetid, fetchSykmelding, fetchSoknader }: FormProps) => {
    const { formState, errors, setFormState, handleSubmit } = useForm<FormInputs>({ validationFunctions });

    // Local state
    const [showCancel, setShowCancel] = useState<boolean>(false);
    const skalAvbrytes = formState.feilaktigeOpplysninger?.some(
        (opplysning) => opplysning === 'PERIODE' || opplysning === 'SYKMELDINGSGRAD_LAV',
    );
    const skalSendes = !!formState.valgtArbeidsgiver;

    // API
    const { sykmeldingId } = useParams();
    const {
        status: sykmeldingBehandletStatus,
        data: sykmeldingBehandlet,
        error: sykmeldingBehandletError,
        fetch: fetchSykmeldingBehandlet,
    } = useFetch<boolean>(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/behandlet`,
        undefined,
        (sykmeldingBehandlet) => {
            if (sykmeldingBehandlet === true) {
                fetchSykmelding();
                fetchSoknader();
                window.scrollTo(0, 0);
            }
        },
    );
    const { startInterval, limitReached } = usePoll(
        () => fetchSykmeldingBehandlet({ credentials: 'include' }),
        sykmeldingBehandlet === true,
        1000,
        10000,
    );

    const { status: sykmeldingBekreftStatus, error: sykmeldingBekreftError, fetch: fetchSykmeldingBekreft } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/bekreft`,
        undefined,
        () => {
            startInterval();
            fetchSykmeldingBehandlet({ credentials: 'include' });
        },
    );
    const { status: sykmeldingSendStatus, error: sykmeldingSendError, fetch: fetchSykmeldingSend } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`,
        undefined,
        () => {
            startInterval();
            fetchSykmeldingBehandlet({ credentials: 'include' });
        },
    );
    const { status: sykmeldingAvbrytStatus, error: sykmeldingAvbrytError, fetch: fetchSykmeldingAvbryt } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/avbryt`,
        undefined,
        () => {
            startInterval();
            fetchSykmeldingBehandlet({ credentials: 'include' });
        },
    );

    return (
        <form
            id="apen-sykmelding-form"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit((state) =>
                    skalSendes
                        ? fetchSykmeldingSend({ body: JSON.stringify(state), credentials: 'include' })
                        : fetchSykmeldingBekreft({ body: JSON.stringify(state), credentials: 'include' }),
                );
            }}
        >
            <BekreftOpplysninger formState={formState} setFormState={setFormState} errors={errors} />
            <Arbeidssituasjon
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                erUtenforVentetid={erUtenforVentetid}
                formState={formState}
                setFormState={setFormState}
                errors={errors}
                skalAvbrytes={skalAvbrytes}
            />

            {skalSendes && (
                <Sykmeldingsopplysninger
                    id="arbeidsgivers-sykmelding"
                    title="Slik ser sykmeldingen ut for arbeidsgiveren din"
                    expandedDefault={false}
                    type="ARBEIDSGIVER"
                >
                    <div className="panel-content-header">
                        <Sidetittel>TODO: Pasientens navn</Sidetittel>
                        <Undertekst>TODO: Pasientens personnummer</Undertekst>
                    </div>
                    <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                    <EtikettMedTekst margin tittel="Diagnose" tekst={<img src={sladd} alt="skjult diagnose" />} />
                    <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                    <PrognoseSeksjon prognose={sykmelding.prognose} />
                    <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                    <LegeSeksjon navn={sykmelding.navnFastlege} />
                    <hr className="margin-bottom--2" />
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <MulighetForArbeid />
                    <Friskmelding prognose={sykmelding.prognose} />
                    <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                    <Arbeidsevne
                        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                        tiltakNAV={sykmelding.tiltakNAV}
                    />
                    <SeksjonMedTittel tittel="Annet">
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </SeksjonMedTittel>
                </Sykmeldingsopplysninger>
            )}

            {!!errors.size && (
                <Feiloppsummering
                    className="margin-bottom--2"
                    tittel="Det finnes feil som må rettes opp"
                    feil={Array.from(errors.values())}
                />
            )}

            {(sykmeldingSendError || sykmeldingBekreftError) && (
                <div className="margin-bottom--1">
                    <AlertStripeFeil>
                        En feil oppsto ved {skalSendes ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst prøv igjen
                        senere.
                    </AlertStripeFeil>
                </div>
            )}

            {(sykmeldingBehandletError || limitReached) && (
                <div className="margin-bottom--1">
                    <AlertStripeAdvarsel>
                        Sykmeldingen ble {skalSendes ? 'sendt' : 'bekreftet'}, men på grunn av en feil med baksystemene
                        klarte vi ikke å hente informasjon knyttet til søknad om sykepenger.
                    </AlertStripeAdvarsel>
                </div>
            )}

            {!skalAvbrytes && (
                <div className="margin-bottom--2 text--center">
                    <Knapp
                        spinner={
                            areAnyPending([sykmeldingSendStatus, sykmeldingBekreftStatus]) ||
                            (areAnyPendingOrFinished([sykmeldingBehandletStatus]) &&
                                !limitReached &&
                                !sykmeldingBehandletError)
                        }
                        type="hoved"
                    >
                        {skalSendes ? 'Send' : 'Bekreft'} sykmelding
                    </Knapp>
                </div>
            )}

            {!skalAvbrytes && (
                <div className="margin-bottom--2 text--center">
                    <Knapp
                        htmlType="button"
                        type="flat"
                        mini
                        onClick={() => setShowCancel((previousValue) => !previousValue)}
                    >
                        Jeg ønsker ikke å bruke denne sykmeldingen
                    </Knapp>
                </div>
            )}

            {sykmeldingAvbrytError && (
                <div className="margin-bottom--1">
                    <AlertStripeFeil>
                        På grunn av en feil med baksystemene klarte vi ikke å avbryte sykmeldingen. Vennligst prøv igjen
                        senere.
                    </AlertStripeFeil>
                </div>
            )}

            {(showCancel || skalAvbrytes) && (
                <AvbrytPanel
                    showLoadingSpinner={sykmeldingAvbrytStatus === 'PENDING'}
                    avbrytSykmelding={() => fetchSykmeldingAvbryt({ credentials: 'include' })}
                    closePanel={setShowCancel}
                    type={skalAvbrytes ? 'MANDATORY_CANCEL' : 'NORMAL'}
                />
            )}
        </form>
    );
};

export default Form;
