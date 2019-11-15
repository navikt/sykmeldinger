import React from 'react';

interface MarginProps {
    children: any | any[];
    liten?: boolean;
}

const Margin = ({ children, liten }: MarginProps) => {
    if (!children) {
        return null;
    }

    return <div style={{ marginBottom: liten ? '1rem' : '2rem' }}>{children}</div>;
};

export default Margin;
