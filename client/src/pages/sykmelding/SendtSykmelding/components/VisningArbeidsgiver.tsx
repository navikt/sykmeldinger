import React from 'react';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';

import Arbeidsevne from '../../components/Infopanel/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../../components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../../components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import ElementMedTekst from '../../components/Infopanel/layout/ElementMedTekst';
import EtikettMedTekst from '../../components/Infopanel/layout/EtikettMedTekst';
import Friskmelding from '../../components/Infopanel/utdypendeelementer/Friskmelding';
import LegeSeksjon from '../../components/Infopanel/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../../components/Infopanel/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../../components/Infopanel/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../../components/Infopanel/layout/SeksjonMedTittel';
import SykmeldingPerioder from '../../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import UtdypendeOpplysninger from '../../components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../../components/Utvidbar/Utvidbar';
import arbeidsgiver from './arbeidsgiver.svg';
import arbeidsgiverHover from './arbeidsgiverHover.svg';
import sladd from './sladd.svg';
import { Sykmelding } from '../../../../types/sykmeldingTypes';

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
