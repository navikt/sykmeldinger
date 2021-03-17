import React from 'react';
import Brodsmuler from '../../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../../commonComponents/Header/Header';
import TilHovedsiden from '../../commonComponents/TilHovedsiden/TilHovedsiden';

const SykmeldingPageWrapper: React.FC = ({ children }) => {
    return (
        <>
            <Header title="Sykmelding" />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: '/sykefravaer',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: '/sykmeldinger',
                        },
                        {
                            title: 'Sykmelding',
                        },
                    ]}
                />
                {children}
            </div>
            <TilHovedsiden />
        </>
    );
};

export default SykmeldingPageWrapper;
