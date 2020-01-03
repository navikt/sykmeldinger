import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';

import Margin from './Margin';

interface TittelProps {
    tekst: string;
}

const Tittel = ({ tekst }: TittelProps) => {
    return (
        <Margin>
            <Sidetittel>{tekst}</Sidetittel>
        </Margin>
    );
};

export default Tittel;
