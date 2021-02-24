import React, { useState } from 'react';
import useForm from '../../../commonComponents/hooks/useForm';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../types/sykmelding';
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
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from '../../../commonComponents/Spinner/Spinner';
import useBrukerinformasjon from '../../../commonComponents/hooks/useBrukerinformasjon';
import useSykmeldingUtenforVentetid from '../../../commonComponents/hooks/useSykmeldingUtenforVentetid';
import useBekreft from '../../../commonComponents/hooks/useBekreft';
import useAvbryt from '../../../commonComponents/hooks/useAvbryt';
import useSend from '../../../commonComponents/hooks/useSend';

interface FormProps {
    sykmelding: Sykmelding;
}

const Form = ({ sykmelding }: FormProps) => {
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
    const { mutate: avbryt, isLoading: isLoadingAvbryt, error: errorAvbryt } = useAvbryt(sykmeldingId);

    const { formState, errors, setFormState, handleSubmit } = useForm<FormInputs>({ validationFunctions });

    // Local state
    const [showCancel, setShowCancel] = useState<boolean>(false);
    const skalAvbrytes = formState.feilaktigeOpplysninger?.some(
        (opplysning) => opplysning === 'PERIODE' || opplysning === 'SYKMELDINGSGRAD_LAV',
    );
    const skalSendes = !!formState.valgtArbeidsgiver;

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

    const { arbeidsgivere } = brukerinformasjon;

    return (
        <form
            id="apen-sykmelding-form"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit((state) => (skalSendes ? send(state) : bekreft(state)));
            }}
        >
            <BekreftOpplysninger formState={formState} setFormState={setFormState} errors={errors} />
            <Arbeidssituasjon
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                erUtenforVentetid={sykmeldingUtenforVentetid}
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

            {(errorSend || errorBekreft) && (
                <div className="margin-bottom--1">
                    <AlertStripeFeil>
                        En feil oppsto ved {skalSendes ? 'send' : 'bekreft'}ing av sykmeldingen. Vennligst prøv igjen
                        senere.
                    </AlertStripeFeil>
                </div>
            )}

            {!skalAvbrytes && (
                <div className="margin-bottom--2 text--center">
                    <Knapp spinner={isLoadingAvbryt} type="hoved">
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

            {errorAvbryt && (
                <div className="margin-bottom--1">
                    <AlertStripeFeil>
                        På grunn av en feil med baksystemene klarte vi ikke å avbryte sykmeldingen. Vennligst prøv igjen
                        senere.
                    </AlertStripeFeil>
                </div>
            )}

            {(showCancel || skalAvbrytes) && (
                <AvbrytPanel
                    showLoadingSpinner={isLoadingAvbryt}
                    avbrytSykmelding={() => avbryt()}
                    closePanel={setShowCancel}
                    type={skalAvbrytes ? 'MANDATORY_CANCEL' : 'NORMAL'}
                />
            )}
        </form>
    );
};

export default Form;
