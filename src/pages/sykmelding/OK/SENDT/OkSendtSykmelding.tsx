import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../components/Spacing/Spacing';
import StatusBanner from '../../../../components/StatusBanner/StatusBanner';

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
                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} arbeidsgiver />
        </div>
    );
};

export default OkSendtSykmelding;
