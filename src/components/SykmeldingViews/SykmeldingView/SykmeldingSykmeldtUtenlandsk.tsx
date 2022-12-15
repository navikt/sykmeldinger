import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { getSykmeldingperioderSorted } from '../../../utils/sykmeldingUtils'

import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder'
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import AnnenInfo from './Sections/SykmeldingSykmeldtUtenlandsk/AnnenInfo'
import styles from './SykmeldingSykmeldtUtenlandsk.module.css'

interface Props {
    sykmelding: SykmeldingFragment
}

function SykmeldingSykmeldtUtenlandsk({ sykmelding }: Props): JSX.Element {
    return (
        <div className={styles.sykmeldingSykmeldtUtenlandsk}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} />
            <AnnenInfo sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingSykmeldtUtenlandsk
