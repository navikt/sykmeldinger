import React from 'react';
import { WarningFilled } from '@navikt/ds-icons';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../Spacing/Spacing';
import StatusBanner from '../../../StatusBanner/StatusBanner';
import { getBehandlerName } from '../../../../utils/behandlerUtils';
import SykmeldingStatusPrint from '../../SykmeldingView/Layout/SykmeldingStatusPrint/SykmeldingStatusPrint';

interface InvalidBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const InvalidBekreftetSykmelding: React.FC<InvalidBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('SYKMELDING_INVALID_BEKREFTET');

    return (
        <div className="sykmelding-container">
            <Spacing amount="large">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>
            <SykmeldingStatusPrint
                title="Avvist sykmelding"
                Icon={WarningFilled}
                list={sykmelding.behandlingsutfall.ruleHits}
            />

            <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} />
        </div>
    );
};

export default InvalidBekreftetSykmelding;
