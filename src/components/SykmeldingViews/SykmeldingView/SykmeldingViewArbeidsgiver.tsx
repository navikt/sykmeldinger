import * as R from 'remeda'

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

interface SykmeldingviewProps {
    sykmelding: SykmeldingFragment
}

function SykmeldingViewArbeidsgiver({ sykmelding }: SykmeldingviewProps): JSX.Element {
    return (
        <div className="p-4 pt-0">
            <SykmeldingenGjelderView pasient={sykmelding.pasient} />
            <PeriodeView
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)}
            />
            <AnnenInfoView sykmelding={sykmelding} />
            {sykmelding.medisinskVurdering?.hovedDiagnose && sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <Diagnoser medisinskVurdering={sykmelding.medisinskVurdering} />
            )}
            {R.pipe(
                sykmelding.sykmeldingsperioder,
                R.map(R.prop('aktivitetIkkeMulig')),
                R.compact,
                R.map((it) => (
                    <AktivitetIkkeMuligView
                        key={
                            it.arbeidsrelatertArsak?.arsak.join('-') ?? it.medisinskArsak?.arsak.join('-') ?? 'unknown'
                        }
                        aktivitetIkkeMulig={it}
                    />
                )),
            )}
            <PrognoseView prognose={sykmelding.prognose} />
            <ArbeidsevneView tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} />
            <MeldingTilArbeidsgiverView meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />
            <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} />
        </div>
    )
}

export default SykmeldingViewArbeidsgiver
