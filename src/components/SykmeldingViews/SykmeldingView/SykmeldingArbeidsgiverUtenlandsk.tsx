import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { getSykmeldingperioderSorted } from '../../../utils/sykmeldingUtils'

import PeriodeView from './Sections/SykmeldingViewArbeidsgiver/PeriodeView'
import SykmeldingenGjelderView from './Sections/SykmeldingViewArbeidsgiver/SykmeldingenGjelderView'
import AnnenInfoView from './Sections/SykmeldingArbeidsgiverUtenlandsk/AnnenInfoView'
import styles from './SykmeldingArbeidsgiverUtenlandsk.module.css'

interface SykmeldingviewProps {
    sykmelding: SykmeldingFragment
}

function SykmeldingArbeidsgiverUtenlandsk({ sykmelding }: SykmeldingviewProps): JSX.Element {
    return (
        <div className={styles.sykmeldingArbeidsgiverUtenlandsk}>
            <SykmeldingenGjelderView pasient={sykmelding.pasient} />
            <PeriodeView perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} />
            <AnnenInfoView sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingArbeidsgiverUtenlandsk
