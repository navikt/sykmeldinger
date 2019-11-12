import React from 'react';

import Margin from './Margin';

interface PanelRadProps {
    children: JSX.Element | JSX.Element[];
}

const PanelRad = ({ children }: PanelRadProps) => {
    return (
        <Margin>
            <div style={{ display: 'flex' }}>{children}</div>
        </Margin>
    );
};

export default PanelRad;
