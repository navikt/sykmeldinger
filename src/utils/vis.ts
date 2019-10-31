import React from 'react';

const Vis = (props: { hvis: boolean; children: React.ReactNode }) => {
    return props.hvis ? props.children : (null as any);
};

export default Vis;
