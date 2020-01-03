import React from 'react';

import arbeidsgiver from '../../svg/arbeidsgiver.svg';
import arbeidsgiverHover from '../../svg/arbeidsgiverHover.svg';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import SykmeldingPerioder from '../Infopanel/panelelementer/periode/SykmeldingPerioder';
import { Sykmelding } from '../../types/sykmeldingTypes';

import sladd from '../../svg/sladd.svg';
import Utvidbar from '../utvidbar/Utvidbar';
import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import ArbeidsuforSeksjon from '../Infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../Infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../Infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../Infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../Infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../Infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../Infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../Infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../Infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../Infopanel/layout/ElementMedTekst';

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
