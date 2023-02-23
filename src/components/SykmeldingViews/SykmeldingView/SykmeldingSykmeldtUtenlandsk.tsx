import { isV3 } from '../../../utils/sykmeldingUtils'
import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsperioderAnsattUtils'

import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder'
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import AnnenInfo from './Sections/SykmeldingSykmeldtUtenlandsk/AnnenInfo'
import styles from './SykmeldingSykmeldtUtenlandsk.module.css'

interface Props {
    sykmelding: UtenlandskSykmelding
}

function SykmeldingSykmeldtUtenlandsk({ sykmelding }: Props): JSX.Element {
    return (
        <div className={styles.sykmeldingSykmeldtUtenlandsk}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                isV3={isV3(sykmelding)}
                egenmeldingsdager={findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)}
            />
            <AnnenInfo sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingSykmeldtUtenlandsk
