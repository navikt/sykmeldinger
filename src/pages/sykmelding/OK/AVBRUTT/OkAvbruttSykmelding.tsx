import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import useGjenapne from '../../../../hooks/useGjenapne';
import { useParams } from 'react-router-dom';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkAvbruttSykmelding: React.FC<OkAvbruttSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_AVBRUTT');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <div style={{ marginBottom: '4rem' }}>
                <AlertStripe type="feil" style={{ marginBottom: '2rem' }}>
                    <Undertittel tag="h2">Sykmeldingen ble avbrutt av deg</Undertittel>
                    <Normaltekst>
                        Dato avbrutt:{' '}
                        {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                    </Normaltekst>
                </AlertStripe>
                <div style={{ textAlign: 'center' }}>
                    <Normaltekst style={{ marginBottom: '1rem' }}>
                        Du kan fortsatt velge å ta i bruk sykmeldingen
                    </Normaltekst>
                    <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                        Bruk sykmeldingen
                    </Knapp>
                    {error && <AlertStripeFeil>Det oppsto en feil ved gjenåpning av sykmeldingen</AlertStripeFeil>}
                </div>
            </div>
            <Sykmeldingsopplysninger
                id="sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkAvbruttSykmelding;
