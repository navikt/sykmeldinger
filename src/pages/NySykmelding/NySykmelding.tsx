import React, { useEffect, useRef } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

import Arbeidsevne from '../../components/Infopanel/utdypendeelementer/Arbeidsevne';
import Arbeidsgiver from '../../types/arbeidsgiverTypes';
import ArbeidsgiverSeksjon from '../../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../../components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../../components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import EldreSykmeldingVarsel from './components/EldreSykmeldingVarsel';
import ElementMedTekst from '../../components/Infopanel/layout/ElementMedTekst';
import FraverSeksjon from '../../components/Infopanel/panelelementer/FraverSeksjon';
import Friskmelding from '../../components/Infopanel/utdypendeelementer/Friskmelding';
import Infopanel from '../../components/Infopanel/Infopanel';
import LegeSeksjon from '../../components/Infopanel/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../../components/Infopanel/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../../components/Infopanel/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../../components/Infopanel/layout/SeksjonMedTittel';
import SendingsSkjema from './components/SendingsSkjema';
import Sidetopp from '../../components/Sidetopp/Sidetopp';
import SkadeSeksjon from '../../components/Infopanel/panelelementer/SkadeSeksjon';
import SporsmalInfoheader from './components/Sporsmal/SporsmalInfoheader';
import SvangerskapSeksjon from '../../components/Infopanel/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import Tittel from '../../components/Infopanel/layout/Tittel';
import UtdypendeOpplysninger from '../../components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../../components/Utvidbar/Utvidbar';
import Veileder from '../../components/Veileder/Veileder';
import doktor from '../../svg/doktor.svg';
import doktorHover from '../../svg/doktorHover.svg';
import tekster from './NySykmelding-tekster';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

const NySykmelding: React.FC<SykmeldingProps> = ({
    sykmelding,
    arbeidsgivere,
    sykmeldingUtenforVentetid,
}: SykmeldingProps) => {
    const utfyllingRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />
            <EldreSykmeldingVarsel />
            <Veileder
                fargetema="info"
                innhold={<Normaltekst>{tekster['ny-sykmelding.introtekst']}</Normaltekst>}
                onClick={() => window.scrollTo({ top: utfyllingRef.current.offsetTop - 100, behavior: 'smooth' })}
                knappTekst="Gå til utfyllingen"
            />

            <Infopanel tittel="Din sykmelding" fargetema="info">
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={sykmelding.medisinskVurdering.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Utvidbar
                    ikon={doktor}
                    ikonHover={doktorHover}
                    tittel={tekster['ny-sykmelding.flere-opplysninger.tittel']}
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
                </Utvidbar>
            </Infopanel>

            {/* TODO: Bestemme om denne skal være i Sporsmal-komponent eller som egen komponent */}
            <div ref={utfyllingRef} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <SporsmalInfoheader />
            </div>

            <SendingsSkjema sykmelding={sykmelding} />
        </div>
    );
};

export default NySykmelding;
