import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../../../utils/DateFormatter';
import FlereOpplysninger from './FlereOpplysninger';
import Section from './Layout/Section';
import SykmeldingEntry from './Layout/SykmeldingEntry';
import ArbeidsevneView from './Sections/ArbeidsevneView';
import MedisinskVurderingView from './Sections/MedisinskVurderingView';
import MeldingTilNavView from './Sections/MeldingTilNavView';
import PeriodeView from './Sections/PeriodeView';
import PrognoseView from './Sections/PrognoseView';
import TilbakedateringView from './Sections/TilbakedateringView';
import UtdypendeOpplysningerView from './Sections/UtdypendeOpplysningerView';

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
    arbeidsgiver?: boolean;
}

const Sykmeldingview: React.FC<SykmeldingviewProps> = ({ sykmelding, arbeidsgiver = false }) => {
    return (
        <>
            <SykmeldingEntry title="Lege/Sykmelder" mainText={sykmelding.behandler.getName()} />
            {!!sykmelding.medisinskVurdering && (
                <MedisinskVurderingView
                    medisinskVurdering={sykmelding.medisinskVurdering}
                    arbeidsgiver={arbeidsgiver}
                />
            )}
            <div style={{ marginBottom: '2rem' }}>
                <PeriodeView perioder={sykmelding.sykmeldingsperioder} />
            </div>

            <FlereOpplysninger>
                <SykmeldingEntry
                    title="Dato sykmeldingen ble skrevet"
                    mainText={DateFormatter.toReadableDate(sykmelding.behandletTidspunkt)}
                />
                {!!sykmelding.arbeidsgiver?.navn && (
                    <SykmeldingEntry
                        title="Arbeidsgiver som legen har skrevet inn"
                        mainText={sykmelding.arbeidsgiver.navn}
                    />
                )}
                {!!sykmelding.prognose && <PrognoseView prognose={sykmelding.prognose} />}
                {Boolean(arbeidsgiver) === false && (
                    <UtdypendeOpplysningerView utdypendeOpplysninger={sykmelding.utdypendeOpplysninger} />
                )}
                <ArbeidsevneView
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                />
                {!!sykmelding.meldingTilNAV && <MeldingTilNavView meldingTilNav={sykmelding.meldingTilNAV} />}
                {!!sykmelding.meldingTilArbeidsgiver && (
                    <Section title="Melding til arbeidsgiver">
                        <SykmeldingEntry
                            title="Andre innspill til arbeidsgiver"
                            mainText={sykmelding.meldingTilArbeidsgiver}
                        />
                    </Section>
                )}
                <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} />
                {!!sykmelding.behandler.tlf && (
                    <Section title="Annet">
                        <SykmeldingEntry title="Telefon til lege/sykmelder" mainText={sykmelding.behandler.tlf} />
                    </Section>
                )}
            </FlereOpplysninger>
        </>
    );
};

export default Sykmeldingview;
