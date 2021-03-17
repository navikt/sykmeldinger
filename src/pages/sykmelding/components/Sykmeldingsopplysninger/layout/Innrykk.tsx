import React from 'react';

interface InnrykkProps {
    children: any | any[];
}

const Innrykk = ({ children }: InnrykkProps) => {
    if (!children) {
        return null;
    }

    return <div style={{ marginLeft: '2.5rem' }}>{children}</div>;
};

export default Innrykk;
