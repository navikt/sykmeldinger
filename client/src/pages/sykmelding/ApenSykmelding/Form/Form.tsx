import React, { useState, useEffect } from 'react';
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
import useFetch from '../../../commonComponents/hooks/useFetch';
interface FormProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    erUtenforVentetid: boolean;
    fetchSykmelding: (request?: RequestInit | undefined) => void;
}

const Form = ({ sykmelding, arbeidsgivere, erUtenforVentetid, fetchSykmelding }: FormProps) => {
    // Form state
    const { formState, errors, setFormState, handleSubmit } = useForm<FormInputs>({ validationFunctions });

    // Local state
    const [showCancel, setShowCancel] = useState<boolean>(false);
    const skalAvbrytes = formState.feilaktigeOpplysninger?.some(
        (opplysning) => opplysning === 'PERIODE' || opplysning === 'SYKMELDINGSGRAD_LAV',
    );
    const skalSendes = !!formState.valgtArbeidsgiver;

    // API
    const { sykmeldingId } = useParams();
    const { status: sykmeldingBekreftStatus, error: sykmeldingBekreftError, fetch: fetchSykmeldingBekreft } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/bekreft`,
    );
    const { status: sykmeldingSendStatus, error: sykmeldingSendError, fetch: fetchSykmeldingSend } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`,
    );
    const { status: sykmeldingAvbrytStatus, error: sykmeldingAvbrytError, fetch: fetchSykmeldingAvbryt } = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/avbryt`,
    );
    const {
        status: sykmeldingBehandletStatus,
        data: sykmeldingBehandlet,
        error: sykmeldingBehandletError,
        fetch: fetchSykmeldingBehandlet,
    } = useFetch<{ soknaderOpprettet: number; erBehandlet: boolean }>(
        `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/behandlet`,
    );

    useEffect(() => {
        if (sykmeldingBekreftStatus === 'FINISHED' || sykmeldingSendStatus === 'FINISHED') {
            if (!sykmeldingBekreftError && !sykmeldingSendError) {
                // Start interval for fetching sykmeldingbehandletstatus
                fetchSykmeldingBehandlet();
            }
        }
    }, [
        sykmeldingBekreftStatus,
        sykmeldingSendStatus,
        sykmeldingBekreftError,
        sykmeldingSendError,
        fetchSykmeldingBehandlet,
    ]);

    const [startTime, setStartTime] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (!startTime) {
            setStartTime(new Date().getTime());
        }
        if (sykmeldingBehandletStatus === 'FINISHED') {
            console.log(startTime);
            if (sykmeldingBehandlet?.erBehandlet) {
                // Refetch sykmelding
                fetchSykmelding();
                window.scrollTo(0, 0);
            } else {
                console.log(startTime && new Date().getTime() - startTime);
                if (startTime && new Date().getTime() - startTime < 20000) {
                    // set timeout
                    setTimeout(() => {
                        fetchSykmeldingBehandlet();
                    }, 1000);
                } else {
                    // set error
                    console.log('this should be an error');
                }
            }
        }
    }, [
        sykmeldingBehandletStatus,
        sykmeldingBehandlet,
        fetchSykmeldingBehandlet,
        startTime,
        setStartTime,
        fetchSykmelding,
    ]);

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

            {!skalAvbrytes && (
                <div className="margin-bottom--2 text--center">
                    <Knapp
                        spinner={
                            sykmeldingSendStatus === 'PENDING' ||
                            sykmeldingBekreftStatus === 'PENDING' ||
                            (sykmeldingBekreftStatus === 'FINISHED' && !sykmeldingBehandlet?.erBehandlet) ||
                            (sykmeldingSendStatus === 'FINISHED' && !sykmeldingBehandlet?.erBehandlet)
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
