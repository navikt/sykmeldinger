import React from 'react';

import SykmeldingTeasere, { SykmeldingTeaserTittel } from '../components/sykmeldinger/SykmeldingTeasere';

const DineSykmeldingerSide: React.FC = () => {
    return (
        <div className="limit">
            <div className="nye-sykmeldinger-teasere">
                <SykmeldingTeasere
                    sykmeldinger={[{}, {}]}
                    visSorterEtter={false}
                    tittel={SykmeldingTeaserTittel.NYE_SYKMELDINGER}
                />
            </div>
            <div className="tidligere-sykmeldinger-teasere">
                <SykmeldingTeasere
                    sykmeldinger={[{}, {}]}
                    visSorterEtter={true}
                    tittel={SykmeldingTeaserTittel.TIDLIGERE_SYKMELDINGER}
                />
            </div>
        </div>
    );
};

export default DineSykmeldingerSide;
