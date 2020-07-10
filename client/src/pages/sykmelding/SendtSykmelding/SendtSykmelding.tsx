import React from 'react';

import Arbeidsevne from '../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import FraverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import Friskmelding from '../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import LegeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import SkadeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import UtdypendeOpplysninger from '../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../components/Utvidbar/Utvidbar';
import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import { Sykmelding } from '../../../types/sykmelding';
import Sykmeldingsopplysninger from '../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import EtikettMedTekst from '../components/Sykmeldingsopplysninger/layout/EtikettMedTekst';
import sladd from './sladd.svg';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import Statuspanel from '../components/Statuspanel/Statuspanel';
import { Soknad } from '../../../types/soknad';
import { Arbeidsgiver } from '../../../types/arbeidsgiver';
import { getSoknadstype, getArbeidsgiverForskutterer, getSoknadFomDato } from '../../../utils/statuspanel-utils';

interface SendtSykmeldingProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    soknader: Soknad[];
}

const SendtSykmelding = ({ sykmelding, arbeidsgivere, soknader }: SendtSykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <Statuspanel
                sykmeldingstatus={sykmelding.sykmeldingStatus.statusEvent}
                erEgenmeldt={sykmelding.egenmeldt}
                arbeidsgiverNavn={sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn}
                sykmeldingSendtEllerBekreftetDato={sykmelding.sykmeldingStatus.timestamp}
                soknadstype={getSoknadstype(soknader)}
                soknadFomDato={getSoknadFomDato(soknader)}
                avventendeSykmelding={sykmelding.sykmeldingsperioder.some((periode) => periode.type === 'AVVENTENDE')}
                arbeidsgiverForskutterLonn={getArbeidsgiverForskutterer(sykmelding, arbeidsgivere)}
                skalViseReisetilskuddInfo={sykmelding.sykmeldingsperioder.some(
                    (periode) => periode.type === 'REISETILSKUDD',
                )}
                skalViseBehandlingsdagerInfo={sykmelding.sykmeldingsperioder.some(
                    (periode) => periode.type === 'BEHANDLINGSDAGER',
                )}
            />
            <Sykmeldingsopplysninger title="Opplysninger fra sykmeldingen">
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering?.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={!!sykmelding.medisinskVurdering?.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Utvidbar
                    ikon={doktor}
                    ikonHover={doktorHover}
                    tittel="Flere opplysninger fra den som har sykmeldt deg"
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
            </Sykmeldingsopplysninger>
            <Sykmeldingsopplysninger
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
            </Sykmeldingsopplysninger>
        </div>
    );
};

export default SendtSykmelding;
