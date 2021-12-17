import Ekspanderbar from 'nav-frontend-ekspanderbartpanel';
import { useState } from 'react';
import './FlereOpplysninger.less';

interface FlereOpplysningerProps {
    disableExpand?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ disableExpand = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(disableExpand);

    return (
        <>
            {!disableExpand ? (
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
