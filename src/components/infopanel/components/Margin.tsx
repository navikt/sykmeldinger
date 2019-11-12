import React from 'react';

interface MarginProps {
    children: JSX.Element | JSX.Element[];
}

const Margin = ({ children }: MarginProps) => {
    return <div style={{ marginBottom: '2rem' }}>{children}</div>;
};

export default Margin;
