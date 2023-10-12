import { ReactElement } from 'react'

import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import PeriodeView from './Sections/SykmeldingViewArbeidsgiver/PeriodeView'
import SykmeldingenGjelderView from './Sections/SykmeldingViewArbeidsgiver/SykmeldingenGjelderView'
import AnnenInfoView from './Sections/SykmeldingArbeidsgiverUtenlandsk/AnnenInfoView'

interface SykmeldingviewProps {
    sykmelding: UtenlandskSykmelding
    chosenEgenmeldingsdager?: string[]
}

function SykmeldingArbeidsgiverUtenlandsk({ sykmelding, chosenEgenmeldingsdager }: SykmeldingviewProps): ReactElement {
    return (
        <div className="px-4">
            <SykmeldingenGjelderView pasient={sykmelding.pasient} parentId="sykmelding-arbeidsgiver-utenlandsk" />
            <PeriodeView
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={
                    chosenEgenmeldingsdager ?? findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)
                }
                parentId="sykmelding-arbeidsgiver-utenlandsk"
            />
            <AnnenInfoView sykmelding={sykmelding} parentId="sykmelding-arbeidsgiver-utenlandsk" />
        </div>
    )
}

export default SykmeldingArbeidsgiverUtenlandsk
