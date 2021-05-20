import NavFrontendChevron from 'nav-frontend-chevron';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import { useState } from 'react';
import './FlereOpplysninger.less';

interface FlereOpplysningerProps {
    expandedDefault?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ expandedDefault = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(expandedDefault);

    return (
        <EkspanderbartpanelBase tittel="Flere opplysninger" apen={expanded} onClick={() => setExpanded(!expanded)}>
            {children}
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                    setExpanded(!expanded);
                }}
                className="flere-opplysninger__toggle--center"
            >
                <Element className="toggle-text">Lukk</Element>
                <NavFrontendChevron type="opp" />
            </button>
        </EkspanderbartpanelBase>
    );
};

export default FlereOpplysninger;
