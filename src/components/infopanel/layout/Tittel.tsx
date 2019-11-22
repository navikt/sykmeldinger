import React from 'react';

import Margin from './Margin';
import { Sidetittel } from 'nav-frontend-typografi';

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
