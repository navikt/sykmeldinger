import React from 'react';

import SporsmalInfoheader from './SporsmalInfoheader';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Form from './Form/Form';
import PapirInfoheader from './PapirInfoheader';
import AvbrytContextProvider from './AvbrytContext';
import AvbrytPanel from '../../components/AvbrytPanel/AvbrytPanel';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_APEN');

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                <div className="margin-bottom--4">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                        Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                        om? Du velger selv om du vil bruke sykmeldingen.
                    </Veilederpanel>
                </div>

                {Boolean(sykmelding.papirsykmelding) && (
                    <div className="margin-bottom--4">
                        <PapirInfoheader />
                    </div>
                )}

                <Sykmeldingsopplysninger
                    id="sykmeldingsopplysninger"
                    title="Opplysninger fra sykmeldingen"
                    sykmelding={sykmelding}
                />

                <div className="margin-bottom--2">
                    <SporsmalInfoheader />
                </div>

                <Form sykmelding={sykmelding} />

                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
