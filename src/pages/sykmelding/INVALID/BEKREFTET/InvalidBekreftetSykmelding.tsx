import React from 'react';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import VeilederContent from '../VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import DateFormatter from '../../../../utils/DateFormatter';
import Spacing from '../../../commonComponents/Spacing/Spacing';

interface InvalidBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const InvalidBekreftetSykmelding: React.FC<InvalidBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('INVALID_BEKREFTET');

    return (
        <div className="sykmelding-container">
            <Spacing amount="large">
                <AlertStripeInfo>
                    Du bekreftet at du har lest at sykmeldingen er avvist den{' '}
                    {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                </AlertStripeInfo>
            </Spacing>

            <Spacing>
                <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </Spacing>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Se hele sykmeldingen din"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default InvalidBekreftetSykmelding;
