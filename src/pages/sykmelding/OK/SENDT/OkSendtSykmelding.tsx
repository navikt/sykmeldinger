import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';

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
                    <Normaltekst>
                        Dato sendt:{' '}
                        {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                    </Normaltekst>
                </AlertStripeSuksess>
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger
                    id="sykmeldingsopplysninger"
                    title="Se hele sykmeldingen din"
                    sykmelding={sykmelding}
                />
            </Spacing>

            <Sykmeldingsopplysninger
                id="arbeidsgivers-sykmelding"
                title="Dette ble sendt til arbeidsgiveren din"
                sykmelding={sykmelding}
                expandedDefault={false}
                arbeidsgiver
            />
        </div>
    );
};

export default OkSendtSykmelding;
