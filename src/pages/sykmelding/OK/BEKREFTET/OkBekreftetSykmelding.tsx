import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import { useParams } from 'react-router-dom';
import useGjenapne from '../../../../hooks/useGjenapne';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import CenterItems from '../../../commonComponents/CenterItems/CenterItems';

interface OkBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkBekreftetSykmelding: React.FC<OkBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_BEKREFTET');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AlertStripeSuksess>
                    <Systemtittel tag="h2">Sykmeldingen er sendt til NAV</Systemtittel>
                    <Normaltekst>
                        Dato sendt:{' '}
                        {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                    </Normaltekst>
                </AlertStripeSuksess>
            </Spacing>

            <Spacing amount="large">
                <CenterItems horizontal>
                    <Spacing amount="small">
                        <Normaltekst>Fylte du ut feil opplysninger?</Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                            gjør utfyllingen på nytt
                        </Knapp>
                    </Spacing>
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

export default OkBekreftetSykmelding;
