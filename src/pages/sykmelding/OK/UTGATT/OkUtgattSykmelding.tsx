import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/SykmeldingsopplysningerContainer';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkUtgattSykmelding: React.FC<OkUtgattSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--2">
                <AlertStripeInfo>
                    <Undertittel>Sykmeldingen er utgått</Undertittel>
                    Dato utgått: {dayjs(sykmelding.sykmeldingStatus.timestamp).format('D. MMM YYYY, kl. hh:mm')}
                </AlertStripeInfo>
            </div>

            <Sykmeldingsopplysninger
                id="flere-sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkUtgattSykmelding;
