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

interface OkBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkBekreftetSykmelding: React.FC<OkBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_BEKREFTET');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <AlertStripeSuksess style={{ marginBottom: '2rem' }}>
                <Systemtittel tag="h2">Sykmeldingen er sendt til NAV</Systemtittel>
                <Normaltekst>
                    Dato sendt:{' '}
                    {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                </Normaltekst>
            </AlertStripeSuksess>

            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <Normaltekst style={{ marginBottom: '1rem' }}>Fylte du ut feil opplysninger?</Normaltekst>
                <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                    gjør utfyllingen på nytt
                </Knapp>
                {error && (
                    <AlertStripeFeil style={{ marginTop: '1rem' }}>
                        Det oppsto en feil ved gjenåpning av sykmeldingen
                    </AlertStripeFeil>
                )}
            </div>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysnigner"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkBekreftetSykmelding;
