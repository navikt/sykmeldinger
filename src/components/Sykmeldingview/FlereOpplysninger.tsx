import { useState } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import Lukknapp from '../Lukknapp/Lukknap';
import styles from './FlereOpplysninger.module.css';

interface FlereOpplysningerProps {
    disableExpand?: boolean;
}

const FlereOpplysninger: React.FC<FlereOpplysningerProps> = ({ disableExpand = false, children }) => {
    const [expanded, setExpanded] = useState<boolean>(disableExpand);

    return (
        <div className={styles.flereOpplysninger}>
            {!disableExpand ? (
                <EkspanderbartpanelBase
                    className={styles.flereOpplysningerToggle}
                    tittel={expanded ? 'Skjul flere opplysninger' : 'Vis flere opplysninger'}
                    apen={expanded}
                    onClick={() => setExpanded(!expanded)}
                    border={false}
                >
                    {children}
                    <Lukknapp onClick={() => setExpanded(false)} />
                </EkspanderbartpanelBase>
            ) : (
                <>{children}</>
            )}
        </div>
    );
};

export default FlereOpplysninger;
