import React from 'react';

interface MarginProps {
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
    liten?: boolean;
    stor?: boolean;
}

const Margin = ({ children, liten, stor }: MarginProps) => {
    if (!children) {
        return null;
    }

    const marginBottom = liten ? '1rem' : stor ? '4rem' : '2rem';

    return <div style={{ marginBottom }}>{children}</div>;
};

export default Margin;
