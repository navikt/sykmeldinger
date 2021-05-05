import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Undertittel } from 'nav-frontend-typografi';
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
                    <Element>{DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </AlertStripeInfo>
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} />
        </div>
    );
};

export default OkUtgattSykmelding;
