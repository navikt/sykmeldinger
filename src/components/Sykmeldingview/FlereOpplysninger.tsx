import Ekspanderbar from 'nav-frontend-ekspanderbartpanel';
import { useState } from 'react';
import './FlereOpplysninger.less';

interface FlereOpplysningerProps {
    expandedDefault?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ expandedDefault = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(expandedDefault);

    return (
        <>
            {!expandedDefault ? (
                <Ekspanderbar
                    className="flere-opplysninger__toggle"
                    tittel={expanded ? 'Skjul flere opplysninger' : 'Vis flere opplysninger'}
                    apen={expanded}
                    onClick={() => setExpanded(!expanded)}
                    border={false}
                >
                    {children}
                </Ekspanderbar>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default FlereOpplysninger;
