import { ReactElement } from 'react'
import * as R from 'remeda'

import { SykmeldingFragment } from 'queries'

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
    chosenEgenmeldingsdager?: string[]
}

const sectionId = 'sykmelding-arbeidsgiver'

function SykmeldingViewArbeidsgiver({ sykmelding, chosenEgenmeldingsdager }: SykmeldingviewProps): ReactElement {
    return (
        <div className="md:p-4 pt-0">
            <SykmeldingenGjelderView pasient={sykmelding.pasient} parentId={sectionId} />
            <PeriodeView
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={
                    chosenEgenmeldingsdager ?? findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)
                }
                parentId={sectionId}
            />
            <AnnenInfoView sykmelding={sykmelding} parentId={sectionId} />
            {sykmelding.medisinskVurdering?.hovedDiagnose && sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <Diagnoser medisinskVurdering={sykmelding.medisinskVurdering} parentId={sectionId} />
            )}
            {R.pipe(
                sykmelding.sykmeldingsperioder,
                R.map(R.prop('aktivitetIkkeMulig')),
                R.compact,
                R.map.indexed((it, index) => (
                    <AktivitetIkkeMuligView
                        key={
                            it.arbeidsrelatertArsak?.arsak.join('-') ?? it.medisinskArsak?.arsak.join('-') ?? 'unknown'
                        }
                        aktivitetIkkeMulig={it}
                        parentId={`${sectionId}-${index}`}
                    />
                )),
            )}
            <PrognoseView prognose={sykmelding.prognose} parentId={sectionId} />
            <ArbeidsevneView tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} parentId={sectionId} />
            <MeldingTilArbeidsgiverView
                meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver}
                parentId={sectionId}
            />
            <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} parentId={sectionId} />
        </div>
    )
}

export default SykmeldingViewArbeidsgiver
