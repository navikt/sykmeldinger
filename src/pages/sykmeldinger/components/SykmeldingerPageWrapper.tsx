import React from 'react';
import Header from '../../commonComponents/Header/Header';
import Breadcrumbs from '../../commonComponents/Breadcrumbs/Breadcrumbs';
import TilHovedsiden from '../../commonComponents/TilHovedsiden/TilHovedsiden';

const SykmeldingerPageWrapper: React.FC = ({ children }) => {
    return (
        <>
            <Header title="Dine sykmeldinger" />
            <div className="limit">
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: '/sykefravaer',
                        },
                        {
                            title: 'Sykmeldinger',
                        },
                    ]}
                />
                {children}
                <TilHovedsiden />
            </div>
        </>
    );
};

export default SykmeldingerPageWrapper;
