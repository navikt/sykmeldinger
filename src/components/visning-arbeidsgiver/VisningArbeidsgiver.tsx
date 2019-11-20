import React from 'react';

import arbeidsgiver from '../../svg/arbeidsgiver.svg';
import arbeidsgiverHover from '../../svg/arbeidsgiverHover.svg';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import SykmeldingPerioder from '../infopanel/panelelementer/periode/SykmeldingPerioder';
import { Sykmelding } from '../../types/sykmeldingTypes';

import sladd from '../../svg/sladd.svg';
import Utvidbar from '../utvidbar/Utvidbar';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import ArbeidsuforSeksjon from '../infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../infopanel/layout/ElementMedTekst';

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
            <SeksjonMedTittel tittel="Annet" utenUnderstrek>
                <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
            </SeksjonMedTittel>
        </Utvidbar>
    );
};

export default VisningArbeidsgiver;
