import React from 'react';

import Arbeidsevne from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import FraverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import Friskmelding from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import LegeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import SkadeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import UtdypendeOpplysninger from '../../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';
import { Sykmelding } from '../../../../types/sykmelding';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel, Element } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { Knapp } from 'nav-frontend-knapper';
import useGjenapne from '../../../commonComponents/hooks/useGjenapne';
import { useParams } from 'react-router-dom';
import useHotjarTrigger from '../../../commonComponents/hooks/useHotjarTrigger';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkAvbruttSykmelding: React.FC<OkAvbruttSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_AVBRUTT');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--4">
                <AlertStripe className="margin-bottom--1" type="feil">
                    <Undertittel tag="h2">Sykmeldingen ble avbrutt av deg</Undertittel>
                    <Element>
                        Dato avbrutt: {dayjs(sykmelding.sykmeldingStatus.timestamp).format('dddd D. MMMM, kl. HH:mm')}
                    </Element>
                </AlertStripe>
                <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                    Bruk sykmeldingen
                </Knapp>
                {error && <AlertStripeFeil>Det oppsto en feil ved gjenåpning av sykmeldingen</AlertStripeFeil>}
            </div>
            <Sykmeldingsopplysninger id="flere-sykmeldingsopplysnigner" title="Opplysninger fra sykmeldingen">
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering?.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={!!sykmelding.medisinskVurdering?.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Sykmeldingsopplysninger
                    id="flere-sykmeldingsopplysnigner"
                    title="Flere opplysniger fra den som sykmeldte deg"
                    type="FLERE_OPPLYSNINGER"
                    expandedDefault={false}
                >
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
            </Sykmeldingsopplysninger>
        </div>
    );
};

export default OkAvbruttSykmelding;
