import { ReactElement } from 'react'

import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import Perioder from './Felles/Perioder'
import SykmeldingenGjelder from './Felles/SykmeldingenGjelder'
import AnnenInfo from './Utenlandsk/AnnenInfo'

interface SykmeldingviewProps {
    sykmelding: UtenlandskSykmelding
    chosenEgenmeldingsdager?: string[]
}

function SykmeldingArbeidsgiverUtenlandsk({ sykmelding, chosenEgenmeldingsdager }: SykmeldingviewProps): ReactElement {
    return (
        <div className="px-4">
            <SykmeldingenGjelder pasient={sykmelding.pasient} parentId="sykmelding-arbeidsgiver-utenlandsk" />
            <Perioder
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={
                    chosenEgenmeldingsdager ?? findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)
                }
                parentId="sykmelding-arbeidsgiver-utenlandsk"
            />
            <AnnenInfo sykmelding={sykmelding} parentId="sykmelding-arbeidsgiver-utenlandsk" />
        </div>
    )
}

export default SykmeldingArbeidsgiverUtenlandsk
