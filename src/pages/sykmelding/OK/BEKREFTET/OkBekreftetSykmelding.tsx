import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Statuspanel from '../../components/Statuspanel/Statuspanel';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/SykmeldingsopplysningerContainer';
import { useParams } from 'react-router-dom';
import useGjenapne from '../../../../hooks/useGjenapne';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';

interface OkBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkBekreftetSykmelding: React.FC<OkBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_BEKREFTET');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Statuspanel
                sykmeldingstatus={sykmelding.sykmeldingStatus}
                erEgenmeldt={sykmelding.egenmeldt}
                avventendeSykmelding={sykmelding.sykmeldingsperioder.some((periode) => periode.type === 'AVVENTENDE')}
            />

            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <Undertittel style={{ marginBottom: '1rem' }}>Fylte du ut feil opplysninger?</Undertittel>
                <Knapp spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                    gjør utfyllingen på nytt
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

export default OkBekreftetSykmelding;
