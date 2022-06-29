import React from 'react';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

import { Sykmelding, SykmeldingChangeStatus } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import { toReadableDate } from '../../../../utils/dateUtils';
import Spacing from '../../../Spacing/Spacing';
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam';
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations';
import { useAmplitude, useLogAmplitudeEvent } from '../../../../amplitude/amplitude';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const skjemanavn = 'gjenåpne avbrutt sykmelding';

const OkAvbruttSykmelding: React.FC<OkAvbruttSykmeldingProps> = ({ sykmelding }) => {
    const logEvent = useAmplitude();
    useHotjarTrigger('SYKMELDING_OK_AVBRUTT');
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } });
    const sykmeldingId = useGetSykmeldingIdParam();
    const [{ loading, error }, gjenapne] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Gjenapne,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    );

    return (
        <div className="sykmelding-container">
            <Spacing amount="small">
                <AlertStripe type="info">
                    <Undertittel tag="h2">
                        {sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble avbrutt av deg
                    </Undertittel>
                    <Element>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </AlertStripe>
            </Spacing>

            {!Boolean(sykmelding.egenmeldt) && (
                <div className="hide-on-print">
                    <Spacing>
                        <Spacing amount="small">
                            <Knapp mini spinner={loading} disabled={loading} onClick={() => gjenapne()}>
                                <svg
                                    width="17"
                                    height="18"
                                    viewBox="0 0 17 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.7592 1.28534L12.7806 1.26344C13.6607 0.362658 15.1255 0.210346 16.1442 1.08352L16.1694 1.10518L16.287 1.21598L16.3102 1.23995C17.2076 2.16907 17.216 3.62155 16.4134 4.59869L15.3627 5.87685L10.0304 12.3686L4.92313 14.6807L6.25205 9.19548L10.754 3.71492L10.7537 3.7147L11.6073 2.67604L11.6525 2.62111L11.6525 2.62112L12.6509 1.40628L12.7592 1.28534ZM12.7364 3.53155L13.724 2.32987L13.7918 2.2542C14.1896 1.84698 14.8124 1.80673 15.2243 2.15979L15.2935 2.22491C15.6649 2.60943 15.6908 3.2484 15.3209 3.6987L14.3462 4.88446L12.7364 3.53155ZM7.55037 9.84487L11.8374 4.62593L13.4472 5.97885L9.1473 11.2137L6.98115 12.1943L7.55037 9.84487ZM0 17.4999H16.9752V16.0832H0V17.4999Z"
                                        fill="#0067C5"
                                    />
                                </svg>
                                <span>gjør utfyllingen på nytt</span>
                            </Knapp>
                        </Spacing>
                        {error && (
                            <AlertStripeFeil role="alert" aria-live="polite">
                                En feil oppsto som gjorde at vi ikke kunne gjenåpne sykmeldingen. Prøv igjen senere.
                            </AlertStripeFeil>
                        )}
                    </Spacing>
                </div>
            )}

            <Sykmeldingsopplysninger sykmelding={sykmelding} />
        </div>
    );
};

export default OkAvbruttSykmelding;
