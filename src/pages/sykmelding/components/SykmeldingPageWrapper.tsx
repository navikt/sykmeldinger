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
                            path: window._env_?.SYKEFRAVAER_ROOT || '#',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: window._env_?.SYKMELDINGER_ROOT || '#',
                        },
                        {
                            title: 'Sykmelding',
                        },
                    ]}
                />
                {children}
                <TilHovedsiden />
            </div>
        </>
    );
};

export default SykmeldingPageWrapper;
