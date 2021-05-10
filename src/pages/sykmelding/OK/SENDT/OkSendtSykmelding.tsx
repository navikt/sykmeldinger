import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import StatusInfo from '../../components/StatusInfo/StatusInfo';

interface OkSendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkSendtSykmelding: React.FC<OkSendtSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_SENDT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AlertStripeSuksess>
                    <Systemtittel tag="h2">
                        Sykmeldingen er sendt til {sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn}
                    </Systemtittel>
                    <Element>{DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </AlertStripeSuksess>
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
