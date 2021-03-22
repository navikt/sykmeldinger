import React from 'react';
import { Sykmelding } from '../../../../types/sykmelding';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import SykmeldingPerioder from '../../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ArbeidsgiverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import FraverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import ArbeidsuforSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import BehandlingsDatoer from '../../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import ElementMedTekst from '../../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import useHotjarTrigger from '../../../commonComponents/hooks/useHotjarTrigger';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkUtgattSykmelding: React.FC<OkUtgattSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--2">
                <AlertStripeInfo>
                    <Undertittel>Sykmeldingen er utgått</Undertittel>
                    Dato utgått: {dayjs(sykmelding.sykmeldingStatus.timestamp).format('D. MMM YYYY, kl. hh:mm')}
                </AlertStripeInfo>
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
                {/* TODO */}
                <LegeSeksjon navn={sykmelding.navnFastlege || ''} />
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

export default OkUtgattSykmelding;
