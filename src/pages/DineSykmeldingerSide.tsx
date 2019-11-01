import React from 'react';

import SykmeldingTeasere, { SykmeldingTeaserTittel } from '../components/sykmeldinger/SykmeldingTeasere';
import SykmeldingerHeader from '../components/sykmeldinger/SykmeldingerHeader';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler'

const brodsmuler: Brodsmule[] = [{
    tittel: 'Sykmeldinger',
    sti: '/',
    erKlikkbar: false
}];

const DineSykmeldingerSide: React.FC = () => {
    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler} />
            <SykmeldingerHeader />
            <div className="nye-sykmeldinger-teasere">
                <SykmeldingTeasere
                    sykmeldinger={[{}, {}]}
                    visSorterEtter={false}
                    tittel={SykmeldingTeaserTittel.NYE_SYKMELDINGER}
                />
            </div>
            <div className="tidligere-sykmeldinger-teasere">
                <SykmeldingTeasere
                    sykmeldinger={[{property: "one", property2: 1}, {property: "two", property2: 2}]}
                    visSorterEtter={true}
                    tittel={SykmeldingTeaserTittel.TIDLIGERE_SYKMELDINGER}
                />
            </div>
        </div>
    );
};

export default DineSykmeldingerSide;
