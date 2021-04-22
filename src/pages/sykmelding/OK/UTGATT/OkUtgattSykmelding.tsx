import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkUtgattSykmelding: React.FC<OkUtgattSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AlertStripeInfo>
                    <Undertittel>Sykmeldingen er utgått</Undertittel>
                    Dato utgått:{' '}
                    {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                </AlertStripeInfo>
            </Spacing>

            <Sykmeldingsopplysninger
                id="flere-sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkUtgattSykmelding;
