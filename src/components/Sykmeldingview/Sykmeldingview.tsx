import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../utils/DateFormatter';
import FlereOpplysninger from './FlereOpplysninger';
import ArbeidsevneView from './Sections/ArbeidsevneView';
import MedisinskVurderingView from './Sections/MedisinskVurderingView';
import MeldingTilArbeidsgiverView from './Sections/MeldingTilArbeidsgiverView';
import MeldingTilNavView from './Sections/MeldingTilNavView';
import PeriodeView from './Sections/PeriodeView';
import ArbeidsgiverView from './Sections/ArbeidsgiverView';
import TilbakedateringView from './Sections/TilbakedateringView';
import UtdypendeOpplysningerView from './Sections/UtdypendeOpplysningerView';
import PrognoseView from './Sections/PrognoseView';
import AnnetView from './Sections/AnnetView';
import Section from './Layout/Section/Section';
import SykmeldingEntry from './Layout/SykmeldingEntry/SykmeldingEntry';
import PasientView from './Sections/PasientView';
import BehandlerView from './Sections/BehandlerView';
import './Sykmeldingview.less';

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
    arbeidsgiver: boolean;
}

const Sykmeldingview: React.FC<SykmeldingviewProps> = ({ sykmelding, arbeidsgiver = false }) => {
    return (
        <div className="sykmeldingsview">
            <PasientView pasient={sykmelding.pasient} arbeidsgiver={arbeidsgiver} />

            <div style={{ marginBottom: '2rem' }}>
                <PeriodeView perioder={sykmelding.sykmeldingsperioder} arbeidsgiver={arbeidsgiver} />
            </div>

            <BehandlerView navnFastlege={sykmelding.navnFastlege} />
            <ArbeidsgiverView arbeidsgiver={sykmelding.arbeidsgiver} />

            <FlereOpplysninger expandedDefault={arbeidsgiver}>
                <MedisinskVurderingView medisinskVurdering={sykmelding.medisinskVurdering} arbeidsgiver={arbeidsgiver} />

                <Section>
                    <SykmeldingEntry
                        title="Dato sykmeldingen ble skrevet"
                        //  TODO is this the correct field? Ref. slack thread
                        mainText={DateFormatter.toReadableDate(sykmelding.behandletTidspunkt)}
                    />
                </Section>

                <PrognoseView prognose={sykmelding.prognose} arbeidsgiver={arbeidsgiver} />

                <UtdypendeOpplysningerView
                    utdypendeOpplysninger={sykmelding.utdypendeOpplysninger}
                    arbeidsgiver={arbeidsgiver}
                />

                <ArbeidsevneView
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                    arbeidsgiver={arbeidsgiver}
                />

                <MeldingTilNavView meldingTilNav={sykmelding.meldingTilNAV} arbeidsgiver={arbeidsgiver} />

                <MeldingTilArbeidsgiverView meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />

                <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} arbeidsgiver={arbeidsgiver} />

                <AnnetView behandler={sykmelding.behandler} />
            </FlereOpplysninger>
        </div>
    );
};

export default Sykmeldingview;
