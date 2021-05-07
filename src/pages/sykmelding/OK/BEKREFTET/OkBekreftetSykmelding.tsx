import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import { useParams } from 'react-router-dom';
import useGjenapne from '../../../../hooks/useGjenapne';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import StatusInfo from '../../components/StatusInfo/StatusInfo';

interface OkBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkBekreftetSykmelding: React.FC<OkBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_BEKREFTET');
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { mutate: gjenapne, isLoading, error } = useGjenapne(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Spacing amount="small">
                <AlertStripeSuksess>
                    <Systemtittel tag="h2">Sykmeldingen er sendt til NAV</Systemtittel>
                    <Element>{DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </AlertStripeSuksess>
            </Spacing>

            <Spacing>
                <Spacing amount="small">
                    <Knapp mini spinner={isLoading} disabled={isLoading} onClick={() => gjenapne()}>
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.7592 1.28534L12.7806 1.26344C13.6607 0.362658 15.1255 0.210346 16.1442 1.08352L16.1694 1.10518L16.287 1.21598L16.3102 1.23995C17.2076 2.16907 17.216 3.62155 16.4134 4.59869L15.3627 5.87685L10.0304 12.3686L4.92313 14.6807L6.25205 9.19548L10.754 3.71492L10.7537 3.7147L11.6073 2.67604L11.6525 2.62111L11.6525 2.62112L12.6509 1.40628L12.7592 1.28534ZM12.7364 3.53155L13.724 2.32987L13.7918 2.2542C14.1896 1.84698 14.8124 1.80673 15.2243 2.15979L15.2935 2.22491C15.6649 2.60943 15.6908 3.2484 15.3209 3.6987L14.3462 4.88446L12.7364 3.53155ZM7.55037 9.84487L11.8374 4.62593L13.4472 5.97885L9.1473 11.2137L6.98115 12.1943L7.55037 9.84487ZM0 17.4999H16.9752V16.0832H0V17.4999Z"
                                fill="#0067C5"
                            />
                        </svg>
                        <span>GJØR UTFYLLINGEN PÅ NYTT</span>
                    </Knapp>
                </Spacing>
                {error && <AlertStripeFeil>Det oppsto en feil ved gjenåpning av sykmeldingen.</AlertStripeFeil>}
            </Spacing>

            <Spacing>
                <StatusInfo
                    avventende={sykmelding.sykmeldingsperioder.some((sm) => sm.type === 'AVVENTENDE')}
                    statusEvent={sykmelding.sykmeldingStatus.statusEvent}
                />
            </Spacing>

            <Sykmeldingsopplysninger expandedDefault={false} sykmelding={sykmelding} />
        </div>
    );
};

export default OkBekreftetSykmelding;
