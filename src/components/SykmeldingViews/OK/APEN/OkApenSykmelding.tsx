import { GuidePanel } from '@navikt/ds-react';
import { WarningFilled } from '@navikt/ds-icons';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../Spacing/Spacing';
import InformationBanner, { Merknadtype } from '../../../InformationBanner/InformationBanner';
import ForceUseOlderSykmelding from '../../../ForceOrder/ForceUseOlderSykmelding';
import SykmeldingStatusPrint from '../../SykmeldingView/Layout/SykmeldingStatusPrint/SykmeldingStatusPrint';

import AvbrytPanel from './AvbrytPanel/AvbrytPanel';
import AvbrytContextProvider from './AvbrytContext';
import PapirInfoheader from './PapirInfoheader';
import Form from './Form/Form';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
    olderSykmeldingId: string | null;
    olderSykmeldingCount: number;
}

function OkApenSykmelding({ sykmelding, olderSykmeldingId, olderSykmeldingCount }: OkApenSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_APEN');

    if (olderSykmeldingId) {
        return (
            <ForceUseOlderSykmelding
                olderSykmeldingId={olderSykmeldingId}
                olderSykmeldingCount={olderSykmeldingCount}
            />
        );
    }

    if (sykmelding.egenmeldt) {
        return (
            <div>
                <Spacing amount="large">
                    <GuidePanel poster>
                        Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger
                        fra egenmeldingen under.
                    </GuidePanel>
                </Spacing>

                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </div>
        );
    }

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                {!olderSykmeldingId && (
                    <div className="hide-on-print">
                        <Spacing>
                            <InformationBanner
                                merknader={sykmelding.merknader}
                                papirsykmelding={sykmelding.papirsykmelding}
                            />
                        </Spacing>
                    </div>
                )}
                {sykmelding.merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING) && (
                    <SykmeldingStatusPrint
                        title="Avvist sykmelding"
                        Icon={WarningFilled}
                        list={sykmelding.behandlingsutfall.ruleHits}
                    />
                )}

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Spacing>
                    <Sykmeldingsopplysninger sykmelding={sykmelding} />
                </Spacing>
                <div className="hide-on-print">
                    <Form sykmelding={sykmelding} />
                    <AvbrytPanel />
                </div>
            </div>
        </AvbrytContextProvider>
    );
}

export default OkApenSykmelding;
