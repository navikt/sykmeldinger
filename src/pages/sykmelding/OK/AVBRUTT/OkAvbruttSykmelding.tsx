import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/SykmeldingsopplysningerContainer';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel, Element } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { Knapp } from 'nav-frontend-knapper';
import useGjenapne from '../../../../hooks/useGjenapne';
import { useParams } from 'react-router-dom';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkAvbruttSykmelding: React.FC<OkAvbruttSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_AVBRUTT');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--4">
                <AlertStripe className="margin-bottom--1" type="feil">
                    <Undertittel tag="h2">Sykmeldingen ble avbrutt av deg</Undertittel>
                    <Element>
                        Dato avbrutt: {dayjs(sykmelding.sykmeldingStatus.timestamp).format('dddd D. MMMM, kl. HH:mm')}
                    </Element>
                </AlertStripe>
                <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                    Bruk sykmeldingen
                </Knapp>
                {error && <AlertStripeFeil>Det oppsto en feil ved gjenåpning av sykmeldingen</AlertStripeFeil>}
            </div>
            <Sykmeldingsopplysninger
                id="flere-sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkAvbruttSykmelding;
