import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import ArbeidsevneView from './Sections/SykmeldingViewArbeidsgiver/ArbeidsevneView'
import MeldingTilArbeidsgiverView from './Sections/SykmeldingViewArbeidsgiver/MeldingTilArbeidsgiverView'
import PeriodeView from './Sections/SykmeldingViewArbeidsgiver/PeriodeView'
import AktivitetIkkeMuligView from './Sections/SykmeldingViewArbeidsgiver/AktivitetIkkeMuligView'
import TilbakedateringView from './Sections/SykmeldingViewArbeidsgiver/TilbakedateringView'
import PrognoseView from './Sections/SykmeldingViewArbeidsgiver/PrognoseView'
import SykmeldingenGjelderView from './Sections/SykmeldingViewArbeidsgiver/SykmeldingenGjelderView'
import Diagnoser from './Sections/SykmeldingViewArbeidsgiver/Diagnoser'
import AnnenInfoView from './Sections/SykmeldingViewArbeidsgiver/AnnenInfoView'
import styles from './SykmeldingViewArbeidsgiver.module.css'

interface SykmeldingviewProps {
    sykmelding: SykmeldingFragment
}

function SykmeldingViewArbeidsgiver({ sykmelding }: SykmeldingviewProps): JSX.Element {
    return (
        <div className={styles.sykmeldingViewArbeidsgiver}>
            <SykmeldingenGjelderView pasient={sykmelding.pasient} />
            <PeriodeView
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)}
            />
            <AnnenInfoView sykmelding={sykmelding} />
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
        </div>
    )
}

export default SykmeldingViewArbeidsgiver
