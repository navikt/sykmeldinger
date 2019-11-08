import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './sidetopp.less';

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
