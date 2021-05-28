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

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
    arbeidsgiver?: boolean;
}

const Sykmeldingview: React.FC<SykmeldingviewProps> = ({ sykmelding, arbeidsgiver = false }) => {
    return (
        <>
            <MedisinskVurderingView medisinskVurdering={sykmelding.medisinskVurdering} arbeidsgiver={arbeidsgiver} />

            <div style={{ marginBottom: '2rem' }}>
                <PeriodeView perioder={sykmelding.sykmeldingsperioder} />
            </div>

            <FlereOpplysninger expandedDefault={arbeidsgiver}>
                <Section>
                    <SykmeldingEntry
                        title="Dato sykmeldingen ble skrevet"
                        mainText={DateFormatter.toReadableDate(sykmelding.behandletTidspunkt)}
                    />
                    <ArbeidsgiverView arbeidsgiver={sykmelding.arbeidsgiver} />
                </Section>

                <PrognoseView prognose={sykmelding.prognose} />

                <UtdypendeOpplysningerView
                    utdypendeOpplysninger={sykmelding.utdypendeOpplysninger}
                    arbeidsgiver={arbeidsgiver}
                />

                <ArbeidsevneView
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                />

                <MeldingTilNavView meldingTilNav={sykmelding.meldingTilNAV} />

                <MeldingTilArbeidsgiverView meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />

                <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} />

                <AnnetView behandler={sykmelding.behandler} />
            </FlereOpplysninger>
        </>
    );
};

export default Sykmeldingview;