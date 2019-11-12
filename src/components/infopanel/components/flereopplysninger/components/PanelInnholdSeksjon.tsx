import React from 'react';

import { Innholdstittel } from 'nav-frontend-typografi';

import Margin from '../../Margin';

interface PanelInnholdSeksjonProps {
    tittel?: string;
    children: JSX.Element[];
}

const PanelInnholdSeksjon = ({ tittel, children }: PanelInnholdSeksjonProps) => {
    return (
        <>
            {tittel && <Innholdstittel>{tittel}</Innholdstittel>}
            {children.map((child, index) => (
                <Margin key={index.toString()}>{child}</Margin>
            ))}
        </>
    );
};

export default PanelInnholdSeksjon;
