import './Sidetopp.less';

import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';

interface SidetoppProps {
    tekst: string;
}

const Sidetopp = ({ tekst }: SidetoppProps) => {
    return (
        <div className="sidetopp">
            <Sidetittel>{tekst}</Sidetittel>
        </div>
    );
};

export default Sidetopp;
