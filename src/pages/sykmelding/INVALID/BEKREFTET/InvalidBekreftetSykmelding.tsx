import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import AvvistVeileder from '../../../../components/AvvistVeileder/AvvistVeileder';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../components/Spacing/Spacing';
import StatusBanner from '../../../../components/StatusBanner/StatusBanner';

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
                    behandlerNavn={sykmelding.behandler.getName()}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} />
        </div>
    );
};

export default InvalidBekreftetSykmelding;
