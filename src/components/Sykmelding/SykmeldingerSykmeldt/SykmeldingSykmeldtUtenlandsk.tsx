import { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

import { isV3 } from '../../../utils/sykmeldingUtils'
import { UtenlandskSykmelding } from '../../../utils/utenlanskUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import Perioder from './Felles/Perioder'
import SykmeldingenGjelder from './Felles/SykmeldingenGjelder'
import Egenmeldingsdager from './Felles/Egenmeldingsdager'
import AnnenInfoUtenlandsk from './Utenlandsk/AnnenInfoUtenlandsk'
import { BrukerSvarExpansionCard } from './Felles/BrukerSvar'

interface Props {
    sykmelding: UtenlandskSykmelding
    shouldShowEgenmeldingsdagerInfo: boolean
}

function SykmeldingSykmeldtUtenlandsk({ sykmelding, shouldShowEgenmeldingsdagerInfo }: Props): ReactElement {
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div>
            <SykmeldingenGjelder pasient={sykmelding.pasient} parentId="sykmelding-sykmeldt-utenlandsk" />
            <Perioder
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                isV3={isV3(sykmelding)}
                parentId="sykmelding-sykmeldt-utenlandsk"
            >
                {egenmeldingsdager && egenmeldingsdager.dager.length > 0 && (
                    <Egenmeldingsdager
                        sykmeldingId={sykmelding.id}
                        egenmeldingsdager={egenmeldingsdager}
                        sykmelding={sykmelding}
                    />
                )}
                {shouldShowEgenmeldingsdagerInfo && (
                    <Alert variant="info">
                        Hvis du ønsker å endre egenmeldingsdager etter at du har sendt sykmeldingen, må du ta kontakt
                        med arbeidsgiver.
                    </Alert>
                )}
            </Perioder>

            <AnnenInfoUtenlandsk sykmelding={sykmelding} parentId="sykmelding-sykmeldt-utenlandsk" />

            {sykmelding.sykmeldingStatus.brukerSvar && (
                <BrukerSvarExpansionCard
                    title="Dine svar"
                    brukerSvar={sykmelding.sykmeldingStatus.brukerSvar}
                    sykmeldingId={sykmelding.id}
                />
            )}
        </div>
    )
}

export default SykmeldingSykmeldtUtenlandsk
