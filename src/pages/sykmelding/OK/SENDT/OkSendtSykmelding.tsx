import React from 'react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/SykmeldingsopplysningerContainer';
import Statuspanel from '../../components/Statuspanel/Statuspanel';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';

interface OkSendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkSendtSykmelding: React.FC<OkSendtSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_SENDT');

    return (
        <div className="sykmelding-container">
            <Statuspanel
                sykmeldingstatus={sykmelding.sykmeldingStatus}
                erEgenmeldt={sykmelding.egenmeldt}
                avventendeSykmelding={sykmelding.sykmeldingsperioder.some((periode) => periode.type === 'AVVENTENDE')}
            />
            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
            <Sykmeldingsopplysninger
                id="arbeidsgivers-sykmelding"
                title="Slik ser sykmeldingen ut for arbeidsgiveren din"
                sykmelding={sykmelding}
                expandedDefault={false}
                arbeidsgiver
            />
        </div>
    );
};

export default OkSendtSykmelding;
