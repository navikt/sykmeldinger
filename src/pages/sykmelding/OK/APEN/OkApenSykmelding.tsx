import React from 'react';

import SporsmalInfoheader from './SporsmalInfoheader';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Form from './Form/Form';
import PapirInfoheader from './PapirInfoheader';
import useBrukerinformasjon from '../../../../hooks/useBrukerinformasjon';
import Spinner from '../../../commonComponents/Spinner/Spinner';
import AvbrytContextProvider from './AvbrytContext';
import AvbrytPanel from '../../components/AvbrytPanel/AvbrytPanel';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_APEN');
    const { isLoading, error, data: brukerinformasjon } = useBrukerinformasjon();

    if (isLoading) {
        return <Spinner headline="Henter brukerinformasjon" />;
    }

    if (error || brukerinformasjon === undefined) {
        return <p>Det oppsto en feil da vi forsøkte å hente brukerinformasjon</p>;
    }

    const { strengtFortroligAdresse } = brukerinformasjon;

    if (strengtFortroligAdresse === true) {
        // TODO: return OkApenKode6Sykmelding
    }

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

                {Boolean(sykmelding.egenmeldt) &&
                    // TODO: egenmeldt info
                    // finnes det egenmeldinger med status APEN?
                    null}

                <div className="margin-bottom--2">
                    <SporsmalInfoheader />
                </div>

                <Sykmeldingsopplysninger
                    id="sykmeldingsopplysninger"
                    title="Opplysninger fra sykmeldingen"
                    sykmelding={sykmelding}
                />

                <Form sykmelding={sykmelding} />

                {/* Avbryt component */}
                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
