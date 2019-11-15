import React from 'react';

import { Innholdstittel } from 'nav-frontend-typografi';

interface OpplysningerSeksjonProps {
    tittel?: string;
    children: (JSX.Element | null)[];
}

const OpplysningerSeksjon = ({ tittel, children }: OpplysningerSeksjonProps) => {
    return (
        <>
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
            )}

            {children}

            <hr />
        </>
    );
};

export default OpplysningerSeksjon;
