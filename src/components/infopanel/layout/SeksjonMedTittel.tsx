import React from 'react';

import { Innholdstittel } from 'nav-frontend-typografi';

interface SeksjonMedTittelProps {
    tittel?: string;
    children: JSX.Element | (JSX.Element | null)[];
    understrek?: boolean;
}

const SeksjonMedTittel = ({ tittel, children, understrek }: SeksjonMedTittelProps) => {
    return (
        <>
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
            )}

            {children}

            {understrek && <hr />}
        </>
    );
};

export default SeksjonMedTittel;
