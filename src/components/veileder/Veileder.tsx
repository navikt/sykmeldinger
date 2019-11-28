import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Knapp } from 'nav-frontend-knapper';

import './veileder.less';
import Bjorn from './Bjorn.svg';

interface VeilederProps {
    innhold: JSX.Element;
    fargetema?: string;
    type?: string;
    kompakt?: boolean;
    onClick?: () => void;
    knappTekst?: string;
    svg?: string;
}

const Veileder = ({
    fargetema = 'normal',
    kompakt = false,
    type = 'plakat',
    innhold,
    onClick,
    knappTekst,
    svg = Bjorn,
}: VeilederProps) => {
    return (
        <div className="veileder-container">
            <Veilederpanel
                kompakt={kompakt}
                type={type as any}
                fargetema={fargetema as any}
                svg={<img src={svg} alt="NAV Veileder" />}
            >
                {innhold}
                {onClick && (
                    <div className="veileder-knapp">
                        <Knapp onClick={onClick}>{knappTekst}</Knapp>
                    </div>
                )}
            </Veilederpanel>
        </div>
    );
};

export default Veileder;
