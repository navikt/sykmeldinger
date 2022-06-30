import React from 'react';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../Spacing/Spacing';
import StatusBanner from '../../../StatusBanner/StatusBanner';

interface OkSendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkSendtSykmelding: React.FC<OkSendtSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('SYKMELDING_OK_SENDT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault />
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} arbeidsgiver />
        </div>
    );
};

export default OkSendtSykmelding;
