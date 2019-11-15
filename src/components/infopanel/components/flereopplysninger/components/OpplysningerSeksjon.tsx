import React from 'react';

import { Innholdstittel } from 'nav-frontend-typografi';

interface OpplysningerSeksjonProps {
    tittel?: string;
    children: JSX.Element | (JSX.Element | null)[];
    utenUnderstrek?: boolean;
}

const OpplysningerSeksjon = ({ tittel, children, utenUnderstrek }: OpplysningerSeksjonProps) => {
    return (
        <>
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
            )}

            {children}

            {!utenUnderstrek && <hr />}
        </>
    );
};

export default OpplysningerSeksjon;
