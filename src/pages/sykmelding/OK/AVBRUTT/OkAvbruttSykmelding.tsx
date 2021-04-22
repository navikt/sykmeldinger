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
import Spacing from '../../../commonComponents/Spacing/Spacing';
import CenterItems from '../../../commonComponents/CenterItems/CenterItems';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkAvbruttSykmelding: React.FC<OkAvbruttSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_AVBRUTT');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AlertStripe type="feil">
                    <Undertittel tag="h2">Sykmeldingen ble avbrutt av deg</Undertittel>
                    <Normaltekst>
                        Dato avbrutt:{' '}
                        {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                    </Normaltekst>
                </AlertStripe>
            </Spacing>

            <Spacing amount="large">
                <CenterItems horizontal>
                    <Spacing amount="small">
                        <Normaltekst>Du kan fortsatt velge å ta i bruk sykmeldingen</Normaltekst>
                    </Spacing>
                    <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                        Bruk sykmeldingen
                    </Knapp>
                    {error && <AlertStripeFeil>Det oppsto en feil ved gjenåpning av sykmeldingen</AlertStripeFeil>}
                </CenterItems>
            </Spacing>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkAvbruttSykmelding;
