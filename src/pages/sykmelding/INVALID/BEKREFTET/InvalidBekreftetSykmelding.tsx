import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import VeilederContent from '../VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';

interface InvalidBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const InvalidBekreftetSykmelding: React.FC<InvalidBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('INVALID_BEKREFTET');

    return (
        <div className="sykmelding-container">
            <div style={{ marginBottom: '5rem' }}>
                <AlertStripeInfo>
                    Du bekreftet at du har lest at sykmeldingen er avvist den{' '}
                    {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                </AlertStripeInfo>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default InvalidBekreftetSykmelding;
