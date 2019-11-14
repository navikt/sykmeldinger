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
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
            )}
            {children.map((child, index) => (
                <Margin key={index.toString()}>{child}</Margin>
            ))}

            <hr />
        </>
    );
};

export default PanelInnholdSeksjon;
