import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Form from './Form/Form';
import PapirInfoheader from './PapirInfoheader';
import AvbrytContextProvider from './AvbrytContext';
import AvbrytPanel from '../../components/AvbrytPanel/AvbrytPanel';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import InfoOmDigitalSykmelding from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('OK_APEN');

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                <Spacing>
                    <Veilederpanel kompakt type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                        Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                        om? Du velger selv om du vil bruke sykmeldingen.
                    </Veilederpanel>
                </Spacing>

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Spacing amount="small">
                    <Sykmeldingsopplysninger
                        id="sykmeldingsopplysninger"
                        title="Se hele sykmeldingen din"
                        sykmelding={sykmelding}
                    />
                </Spacing>

                <Spacing amount="large">
                    <InfoOmDigitalSykmelding />
                </Spacing>

                <Form sykmelding={sykmelding} />

                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
