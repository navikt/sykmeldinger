import React from 'react';

import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';

interface SeksjonMedTittelProps {
    tittel?: string;
    children: JSX.Element | (JSX.Element | null)[];
    utenUnderstrek?: boolean;
}

const SeksjonMedTittel = ({ tittel, children, utenUnderstrek }: SeksjonMedTittelProps) => {
    return (
        <>
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Systemtittel>{tittel}</Systemtittel>
                </div>
            )}

            {children}

            {!utenUnderstrek && <hr />}
        </>
    );
};

export default SeksjonMedTittel;
