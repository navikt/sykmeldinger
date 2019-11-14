import React from 'react';

interface MarginProps {
    children: JSX.Element | (JSX.Element | null)[];
}

const Margin = ({ children }: MarginProps) => {
    if (!children) {
        return null;
    }

    return <div style={{ marginBottom: '2rem' }}>{children}</div>;
};

export default Margin;
