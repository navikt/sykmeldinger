import './Hjelpetekstwrapper.less';

import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';

interface HjelpetekstWrapperProps {
    tekst: string;
}

const HjelpetekstWrapper = ({ tekst }: HjelpetekstWrapperProps) => {
    return (
        <div className="hjelpetekst-container">
            <Hjelpetekst>
                <div className="hjelpetekst-container__tekst">{tekst}</div>
            </Hjelpetekst>
        </div>
    );
};

export default HjelpetekstWrapper;
