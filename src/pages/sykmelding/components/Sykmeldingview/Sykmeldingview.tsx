import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../../../utils/DateFormatter';
import FlereOpplysninger from './FlereOpplysninger';
import SykmeldingEntry from './Layout/SykmeldingEntry';
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

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
    arbeidsgiver?: boolean;
}

const Sykmeldingview: React.FC<SykmeldingviewProps> = ({ sykmelding, arbeidsgiver = false }) => {
    return (
        <>
            <SykmeldingEntry title="Lege/Sykmelder" mainText={sykmelding.behandler.getName()} />

            <MedisinskVurderingView medisinskVurdering={sykmelding.medisinskVurdering} arbeidsgiver={arbeidsgiver} />

            <div style={{ marginBottom: '2rem' }}>
                <PeriodeView perioder={sykmelding.sykmeldingsperioder} />
            </div>

            <FlereOpplysninger>
                <SykmeldingEntry
                    title="Dato sykmeldingen ble skrevet"
                    mainText={DateFormatter.toReadableDate(sykmelding.behandletTidspunkt)}
                />

                <ArbeidsgiverView arbeidsgiver={sykmelding.arbeidsgiver} />

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

                <AnnetView behandlerTlf={sykmelding.behandler.tlf} />
            </FlereOpplysninger>
        </>
    );
};

export default Sykmeldingview;
