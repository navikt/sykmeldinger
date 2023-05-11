import { isV3 } from '../../../utils/sykmeldingUtils'
import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder'
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import AnnenInfo from './Sections/SykmeldingSykmeldtUtenlandsk/AnnenInfo'
import Egenmeldingsdager from './Sections/SykmeldingViewSykmeldt/Egenmeldingsdager'
import RedigerEgenmeldingsdagerLink from './Sections/SykmeldingViewSykmeldt/RedigerEgenmeldingsdagerLink'

interface Props {
    sykmelding: UtenlandskSykmelding
    editableEgenmelding: boolean
}

function SykmeldingSykmeldtUtenlandsk({ sykmelding, editableEgenmelding }: Props): JSX.Element {
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} isV3={isV3(sykmelding)} />
            {egenmeldingsdager && egenmeldingsdager.dager.length > 0 && (
                <Egenmeldingsdager
                    sykmeldingId={sykmelding.id}
                    egenmeldingsdager={egenmeldingsdager}
                    sykmelding={sykmelding}
                    editableEgenmelding={editableEgenmelding}
                />
            )}
            {editableEgenmelding && (
                <RedigerEgenmeldingsdagerLink
                    sykmeldingId={sykmelding.id}
                    hasEgenmeldingsdager={egenmeldingsdager != null}
                />
            )}
            <AnnenInfo sykmelding={sykmelding} />
        </div>
    )
}

export default SykmeldingSykmeldtUtenlandsk
