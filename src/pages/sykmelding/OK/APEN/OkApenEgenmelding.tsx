import Veilederpanel from 'nav-frontend-veilederpanel';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkApenEgenmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenEgenmelding: React.FC<OkApenEgenmeldingProps> = ({ sykmelding }) => {
    return (
        <div>
            <Spacing amount="large">
                <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                    Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger fra
                    egenmeldingen under.
                </Veilederpanel>
            </Spacing>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Se hele egenmeldingen din"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkApenEgenmelding;
