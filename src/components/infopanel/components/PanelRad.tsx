import React from 'react';

interface PanelRadProps {
    children: JSX.Element | JSX.Element[];
}

const PanelRad = ({ children }: PanelRadProps) => {
    return <div style={{ display: 'flex', marginBottom: '2rem' }}>{children}</div>;
};

export default PanelRad;
