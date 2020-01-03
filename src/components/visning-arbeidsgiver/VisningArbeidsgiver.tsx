import React from 'react';

import arbeidsgiver from '../../svg/arbeidsgiver.svg';
import arbeidsgiverHover from '../../svg/arbeidsgiverHover.svg';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import SykmeldingPerioder from '../../pages/Sykmeldingside/components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import { Sykmelding } from '../../types/sykmeldingTypes';

import sladd from '../../svg/sladd.svg';
import Utvidbar from '../utvidbar/Utvidbar';
import EtikettMedTekst from '../../pages/Sykmeldingside/components/Infopanel/layout/EtikettMedTekst';
import ArbeidsuforSeksjon from '../../pages/Sykmeldingside/components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../pages/Sykmeldingside/components/Infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../../pages/Sykmeldingside/components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../pages/Sykmeldingside/components/Infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../../pages/Sykmeldingside/components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../pages/Sykmeldingside/components/Infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../pages/Sykmeldingside/components/Infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../pages/Sykmeldingside/components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../pages/Sykmeldingside/components/Infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../pages/Sykmeldingside/components/Infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../pages/Sykmeldingside/components/Infopanel/layout/ElementMedTekst';

interface VisningArbeidsgiverProps {
    sykmelding: Sykmelding;
}

const VisningArbeidsgiver = ({ sykmelding }: VisningArbeidsgiverProps) => {
    return (
        <Utvidbar
            fargetema="lilla"
            ikon={arbeidsgiver}
            ikonHover={arbeidsgiverHover}
            tittel="Slik ser sykmeldingen ut for arbeidsgiveren din"
        >
            <div className="panel-content-header">
                <Sidetittel>TODO: Pasientens navn</Sidetittel>
                <Undertekst>TODO: Pasientens personnummer</Undertekst>
            </div>
            <SykmeldingPerioder perioder={sykmelding.perioder} />
            <EtikettMedTekst margin tittel="Diagnose" tekst={<img src={sladd} alt="skjult diagnose" />} />

            <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
            <PrognoseSeksjon prognose={sykmelding.prognose} />
            <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
            <LegeSeksjon navn={sykmelding.navnFastlege} />

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
        </Utvidbar>
    );
};

export default VisningArbeidsgiver;
