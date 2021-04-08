import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import React from 'react';
import { Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import ElementMedTekst from '../layout/ElementMedTekst';
import EtikettMedTekst from '../layout/EtikettMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ArbeidsgiverSeksjon from '../panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../panelelementer/ArbeidsuforSeksjon';
import LegeSeksjon from '../panelelementer/LegeSeksjon';
import SykmeldingPerioder from '../panelelementer/periode/SykmeldingPerioder';
import PrognoseSeksjon from '../panelelementer/PrognoseSeksjon';
import Arbeidsevne from '../utdypendeelementer/Arbeidsevne';
import BehandlingsDatoer from '../utdypendeelementer/BehandlingsDatoer';
import Friskmelding from '../utdypendeelementer/Friskmelding';
import MulighetForArbeid from '../utdypendeelementer/MulighetForArbeid';
import UtdypendeOpplysninger from '../utdypendeelementer/UtdypendeOpplysninger';
import sladd from '../svg/sladd.svg'

interface SykmeldingsopplysningerArbeidsgiverProps {
    sykmelding: Sykmelding;
}

const SykmeldingsopplysningerArbeidsgiver: React.FC<SykmeldingsopplysningerArbeidsgiverProps> = ({ sykmelding }) => (
    <>
        <div className="panel-content-header">
            <Sidetittel>TODO: Pasientens navn</Sidetittel>
            <Undertekst>TODO: Pasientens personnummer</Undertekst>
        </div>
        <SykmeldingPerioder sykmelding={sykmelding} />
        <EtikettMedTekst margin tittel="Diagnose" tekst={<img src={sladd} alt="skjult diagnose" />} />

        <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
        <PrognoseSeksjon prognose={sykmelding.prognose} />
        <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
        {/* TODO */}
        <LegeSeksjon navn={sykmelding.navnFastlege || ''} />

        <hr style={{ marginBottom: '2rem' }} />

        <BehandlingsDatoer
            behandletTidspunkt={sykmelding.behandletTidspunkt}
            syketilfelleStartDato={sykmelding.syketilfelleStartDato}
        />
        <MulighetForArbeid />
        <Friskmelding prognose={sykmelding.prognose} />
        <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
        <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} tiltakNAV={sykmelding.tiltakNAV} />
        <SeksjonMedTittel tittel="Annet">
            <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
        </SeksjonMedTittel>
    </>
);

export default SykmeldingsopplysningerArbeidsgiver;
