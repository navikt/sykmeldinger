import React from 'react';
import Header from '../../commonComponents/Header/Header';
import Breadcrumbs from '../../commonComponents/Breadcrumbs/Breadcrumbs';
import TilHovedsiden from '../../commonComponents/TilHovedsiden/TilHovedsiden';
import Spacing from '../../commonComponents/Spacing/Spacing';

const SykmeldingerPageWrapper: React.FC = ({ children }) => {
    return (
        <>
            <Header title="Dine sykmeldinger" />
            <div className="limit">
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: window._env_?.SYKEFRAVAER_ROOT || '#',
                        },
                        {
                            title: 'Sykmeldinger',
                        },
                    ]}
                />
                {children}
                <Spacing direction="top" amount="large">
                    <TilHovedsiden />
                </Spacing>
            </div>
        </>
    );
};

export default SykmeldingerPageWrapper;
