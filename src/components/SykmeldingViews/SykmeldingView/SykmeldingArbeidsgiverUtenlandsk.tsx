import { getSykmeldingperioderSorted } from '../../../utils/sykmeldingUtils'
import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'

import PeriodeView from './Sections/SykmeldingViewArbeidsgiver/PeriodeView'
import SykmeldingenGjelderView from './Sections/SykmeldingViewArbeidsgiver/SykmeldingenGjelderView'
import AnnenInfoView from './Sections/SykmeldingArbeidsgiverUtenlandsk/AnnenInfoView'
import styles from './SykmeldingArbeidsgiverUtenlandsk.module.css'

interface SykmeldingviewProps {
    sykmelding: UtenlandskSykmelding
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
