import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { useState } from 'react';
import Lukknapp from '../Lukknapp/Lukknap';
import './FlereOpplysninger.less';

interface FlereOpplysningerProps {
    expandedDefault?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ expandedDefault = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(expandedDefault);

    return (
        <EkspanderbartpanelBase tittel="Flere opplysninger" apen={expanded} onClick={() => setExpanded(!expanded)}>
            {children}
            <Lukknapp onClick={() => setExpanded(!expanded)} />
        </EkspanderbartpanelBase>
    );
};

export default FlereOpplysninger;
