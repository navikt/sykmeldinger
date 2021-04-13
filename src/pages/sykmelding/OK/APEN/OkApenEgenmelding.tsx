import Veilederpanel from 'nav-frontend-veilederpanel';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkApenEgenmeldingProps {
    sykmelding: Sykmelding;
}

const OkApenEgenmelding: React.FC<OkApenEgenmeldingProps> = ({ sykmelding }) => {
    return (
        <div>
            <div className="margin-bottom--4">
                <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                    Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger fra
                    egenmeldingen under.
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Opplysninger fra egenmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkApenEgenmelding;
