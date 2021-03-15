import React from 'react';

import Arbeidsevne from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import FraverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import Friskmelding from '../../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import LegeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import SkadeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import SporsmalInfoheader from './SporsmalInfoheader';
import SvangerskapSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import UtdypendeOpplysninger from '../../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';

import { Sykmelding } from '../../../../types/sykmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Form from './Form/Form';
import PapirInfoheader from './PapirInfoheader';
import useBrukerinformasjon from '../../../commonComponents/hooks/useBrukerinformasjon';
import Spinner from '../../../commonComponents/Spinner/Spinner';
import AvbrytContextProvider from './AvbrytContext';
import AvbrytPanel from '../../components/AvbrytPanel/AvbrytPanel';
import useHotjarTrigger from '../../../commonComponents/hooks/useHotjarTrigger';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_APEN');
    const { isLoading, error, data: brukerinformasjon } = useBrukerinformasjon();

    if (isLoading) {
        return <Spinner headline="Henter brukerinformasjon" />;
    }

    if (error || brukerinformasjon === undefined) {
        return <p>Det oppsto en feil da vi forsøkte å hente brukerinformasjon</p>;
    }

    const { diskresjonskode } = brukerinformasjon;

    if (diskresjonskode === true) {
        // TODO: return OkApenKode6Sykmelding
    }

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                <div className="margin-bottom--4">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                        Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                        om? Du velger selv om du vil bruke sykmeldingen.
                    </Veilederpanel>
                </div>

                {Boolean(sykmelding.papirsykmelding) && (
                    <div className="margin-bottom--4">
                        <PapirInfoheader />
                    </div>
                )}

                {Boolean(sykmelding.egenmeldt) &&
                    // TODO: egenmeldt info
                    // finnes det egenmeldinger med status APEN?
                    null}

                <div className="margin-bottom--2">
                    <SporsmalInfoheader />
                </div>

                <Sykmeldingsopplysninger id="sykmeldingsopplysninger" title="Opplysninger fra sykmeldingen">
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
                            <ElementMedTekst
                                margin
                                tittel="Telefon til lege/sykmelder"
                                tekst={sykmelding.behandler.tlf}
                            />
                        </SeksjonMedTittel>
                    </Sykmeldingsopplysninger>
                </Sykmeldingsopplysninger>

                <Form sykmelding={sykmelding} />

                {/* Avbryt component */}
                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
