import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsperioderAnsattUtils'

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
            <PeriodeView
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                egenmeldingsdager={findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)}
            />
            <AnnenInfoView sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingArbeidsgiverUtenlandsk
