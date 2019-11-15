import React from 'react';

interface MarginProps {
    children: any | any[];
}

const Margin = ({ children }: MarginProps) => {
    if (!children) {
        return null;
    }

    return <div style={{ marginBottom: '2rem' }}>{children}</div>;
};

export default Margin;
