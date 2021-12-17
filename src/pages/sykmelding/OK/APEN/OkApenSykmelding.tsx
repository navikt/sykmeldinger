import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Form from './Form/Form';
import PapirInfoheader from './PapirInfoheader';
import AvbrytContextProvider from './AvbrytContext';
import AvbrytPanel from './AvbrytPanel/AvbrytPanel';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../components/Spacing/Spacing';
import InformationBanner from '../../../../components/InformationBanner/InformationBanner';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../../../components/Veileder/svg/VeilederMaleSvg';

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('SYKMELDING_OK_APEN');

    if (sykmelding.egenmeldt) {
        return (
            <div>
                <Spacing amount="large">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                        Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger
                        fra egenmeldingen under.
                    </Veilederpanel>
                </Spacing>

                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </div>
        );
    }

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                <Spacing>
                    <InformationBanner merknader={sykmelding.merknader} papirsykmelding={sykmelding.papirsykmelding} />
                </Spacing>

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Sykmeldingsopplysninger sykmelding={sykmelding} />
                <Form sykmelding={sykmelding} />

                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
