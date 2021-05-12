import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import StatusInfo from '../../components/StatusInfo/StatusInfo';
import StatusBanner from '../../../commonComponents/StatusBanner/StatusBanner';

interface OkSendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkSendtSykmelding: React.FC<OkSendtSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_SENDT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <StatusInfo
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    sykmeldingsperioder={sykmelding.sykmeldingsperioder}
                />
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} />
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} arbeidsgiver />
        </div>
    );
};

export default OkSendtSykmelding;
