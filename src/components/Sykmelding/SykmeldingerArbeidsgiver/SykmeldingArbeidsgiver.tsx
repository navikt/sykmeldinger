import { ReactElement } from 'react'
import * as R from 'remeda'

import { SykmeldingFragment } from 'queries'

import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import Perioder from './Felles/Perioder'
import SykmeldingenGjelder from './Felles/SykmeldingenGjelder'
import Arbeidsevne from './Nasjonal/Arbeidsevne'
import MeldingTilArbeidsgiverView from './Nasjonal/MeldingTilArbeidsgiver'
import AktivitetIkkeMulig from './Nasjonal/AktivitetIkkeMulig'
import Tilbakedatering from './Nasjonal/Tilbakedatering'
import PrognoseView from './Nasjonal/PrognoseView'
import Diagnoser from './Nasjonal/Diagnoser'
import AnnenInfo from './Nasjonal/AnnenInfo'

interface SykmeldingviewProps {
    sykmelding: SykmeldingFragment
    chosenEgenmeldingsdager?: string[]
}

const sectionId = 'sykmelding-arbeidsgiver'

function SykmeldingArbeidsgiver({ sykmelding, chosenEgenmeldingsdager }: SykmeldingviewProps): ReactElement {
    return (
        <div className="md:p-4 pt-0">
            <SykmeldingenGjelder pasient={sykmelding.pasient} parentId={sectionId} />
            <Perioder
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={
                    chosenEgenmeldingsdager ?? findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)
                }
                parentId={sectionId}
            />
            <AnnenInfo sykmelding={sykmelding} parentId={sectionId} />
            {sykmelding.medisinskVurdering?.hovedDiagnose && sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <Diagnoser medisinskVurdering={sykmelding.medisinskVurdering} parentId={sectionId} />
            )}
            {R.pipe(
                sykmelding.sykmeldingsperioder,
                R.map(R.prop('aktivitetIkkeMulig')),
                R.filter(R.isTruthy),
                R.map((it, index) => (
                    <AktivitetIkkeMulig
                        key={
                            it.arbeidsrelatertArsak?.arsak.join('-') ?? it.medisinskArsak?.arsak.join('-') ?? 'unknown'
                        }
                        aktivitetIkkeMulig={it}
                        parentId={`${sectionId}-${index}`}
                    />
                )),
            )}
            <PrognoseView prognose={sykmelding.prognose} parentId={sectionId} />
            <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} parentId={sectionId} />
            <MeldingTilArbeidsgiverView
                meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver}
                parentId={sectionId}
            />
            <Tilbakedatering kontaktMedPasient={sykmelding.kontaktMedPasient} parentId={sectionId} />
        </div>
    )
}

export default SykmeldingArbeidsgiver
