import { getSykmeldingperioderSorted, Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import { toReadableDate } from '../../../utils/dateUtils';
import { getBehandlerName } from '../../../models/Sykmelding/Behandler';

import ArbeidsevneView from './Sections/SykmeldingViewArbeidsgiver/ArbeidsevneView';
import MeldingTilArbeidsgiverView from './Sections/SykmeldingViewArbeidsgiver/MeldingTilArbeidsgiverView';
import PeriodeView from './Sections/SykmeldingViewArbeidsgiver/PeriodeView';
import AktivitetIkkeMuligView from './Sections/SykmeldingViewArbeidsgiver/AktivitetIkkeMuligView';
import ArbeidsgiverView from './Sections/SykmeldingViewArbeidsgiver/ArbeidsgiverView';
import TilbakedateringView from './Sections/SykmeldingViewArbeidsgiver/TilbakedateringView';
import PrognoseView from './Sections/SykmeldingViewArbeidsgiver/PrognoseView';
import AnnetView from './Sections/SykmeldingViewArbeidsgiver/AnnetView';
import SykmeldingEntry from './Layout/SykmeldingEntry/SykmeldingEntry';
import PasientView from './Sections/SykmeldingViewArbeidsgiver/PasientView';
import Diagnoser from './Sections/Diagnoser';
import styles from './SykmeldingViewArbeidsgiver.module.css';

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
}

const SykmeldingViewArbeidsgiver: React.FC<SykmeldingviewProps> = ({ sykmelding }) => {
    return (
        <div className={styles.sykmeldingViewArbeidsgiver}>
            <PasientView pasient={sykmelding.pasient} />

            <PeriodeView perioder={getSykmeldingperioderSorted(sykmelding)} />
            <div className={styles.behandlerOgArbeidsgiver}>
                <SykmeldingEntry title="Behandler" mainText={getBehandlerName(sykmelding.behandler)} />
                <ArbeidsgiverView arbeidsgiver={sykmelding.arbeidsgiver} />
            </div>

            <div className={styles.datoSykmeldingenBleSkrevet}>
                <SykmeldingEntry
                    title="Dato sykmeldingen ble skrevet"
                    //  TODO is this the correct field? Ref. slack thread
                    mainText={toReadableDate(sykmelding.behandletTidspunkt)}
                />
            </div>

            {sykmelding.medisinskVurdering?.hovedDiagnose && sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <Diagnoser medisinskVurdering={sykmelding.medisinskVurdering} sladd />
            )}

            {sykmelding.sykmeldingsperioder?.map(
                (periode, index) =>
                    !!periode.aktivitetIkkeMulig && (
                        <AktivitetIkkeMuligView key={index} aktivitetIkkeMulig={periode.aktivitetIkkeMulig} />
                    ),
            )}

            <PrognoseView prognose={sykmelding.prognose} />

            <ArbeidsevneView tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} />

            <MeldingTilArbeidsgiverView meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />

            <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} />

            <AnnetView behandler={sykmelding.behandler} />
        </div>
    );
};

export default SykmeldingViewArbeidsgiver;
