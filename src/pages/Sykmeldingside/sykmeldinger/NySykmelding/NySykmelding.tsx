import React, { useRef, useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Tittel from '../../components/Infopanel/layout/Tittel';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import tekster from './NySykmelding-tekster';
import Sidetopp from '../../components/Sidetopp/Sidetopp';
import Infopanel from '../../components/Infopanel/Infopanel';
import Veileder from '../../../../components/veileder/Veileder';
import EldreSykmeldingVarsel from './components/EldreSykmeldingVarsel';
import SykmeldingPerioder from '../../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../../components/Infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../components/Infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../components/Infopanel/panelelementer/SkadeSeksjon';
import ArbeidsuforSeksjon from '../../components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../components/Infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../components/Infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../../components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../components/Infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../components/Infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../components/Infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../components/Infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../components/Infopanel/layout/ElementMedTekst';
import Sporsmal from '../../../../components/sporsmal/Sporsmal';
import SporsmalInfoheader from '../../../../components/sporsmal/SporsmalInfoheader';
import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import Utvidbar from '../../../../components/utvidbar/Utvidbar';

import doktor from '../../../../svg/doktor.svg';
import doktorHover from '../../../../svg/doktorHover.svg';

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

    console.log(sykmelding);

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

            <Sporsmal
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                sykmeldingUtenforVentetid={sykmeldingUtenforVentetid}
            />
        </div>
    );
};

export default NySykmelding;
