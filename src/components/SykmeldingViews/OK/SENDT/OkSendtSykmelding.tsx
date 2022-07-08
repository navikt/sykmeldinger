import React from 'react';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Spacing from '../../../Spacing/Spacing';
import StatusBanner from '../../../StatusBanner/StatusBanner';
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer';
import SykmeldingArbeidsgiverContainer from '../../SykmeldingView/SykmeldingArbeidsgiverContainer';

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
                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </Spacing>

            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
        </div>
    );
};

export default OkSendtSykmelding;
