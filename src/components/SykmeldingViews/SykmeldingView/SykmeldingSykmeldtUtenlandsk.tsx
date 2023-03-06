import { isV3 } from '../../../utils/sykmeldingUtils'
import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'
import { getPublicEnv } from '../../../utils/env'

import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder'
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import AnnenInfo from './Sections/SykmeldingSykmeldtUtenlandsk/AnnenInfo'
import styles from './SykmeldingSykmeldtUtenlandsk.module.css'
import Egenmeldingsdager from './Sections/SykmeldingViewSykmeldt/Egenmeldingsdager/Egenmeldingsdager'

const publicEnv = getPublicEnv()

interface Props {
    sykmelding: UtenlandskSykmelding
    editableEgenmelding: boolean
}

function SykmeldingSykmeldtUtenlandsk({ sykmelding, editableEgenmelding }: Props): JSX.Element {
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div className={styles.sykmeldingSykmeldtUtenlandsk}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} isV3={isV3(sykmelding)} />
            {publicEnv.DISPLAY_EGENMELDING === 'true' && egenmeldingsdager && (
                <Egenmeldingsdager
                    egenmeldingsdager={egenmeldingsdager}
                    sykmelding={sykmelding}
                    editableEgenmelding={editableEgenmelding}
                />
            )}
            <AnnenInfo sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingSykmeldtUtenlandsk
