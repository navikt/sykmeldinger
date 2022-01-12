import Ekspanderbar from 'nav-frontend-ekspanderbartpanel';
import { useState } from 'react';
import styles from './FlereOpplysninger.module.css';

interface FlereOpplysningerProps {
    disableExpand?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ disableExpand = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(disableExpand);

    return (
        <div className={styles.flereOpplysninger}>
            {!disableExpand ? (
                <Ekspanderbar
                    className={styles.flereOpplysningerToggle}
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
        </div>
    );
};

export default FlereOpplysninger;
