import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AvbrytContextProps {
    maAvbryte: boolean;
    setMaAvbryte: Dispatch<SetStateAction<boolean>>;
}

export const AvbrytContext = createContext<AvbrytContextProps>({
    maAvbryte: false,
    setMaAvbryte: (): void => {
        throw new Error('setMaAvbryte function must be overridden');
    },
});

// Some answers in the OkApenSykmelding form implies that the sykmelding must "avbrytes"
// This context makes it easier to set and pass this value across the component tree
const AvbrytContextProvider: React.FC = ({ children }) => {
    const [maAvbryte, setMaAvbryte] = useState(false);

    return <AvbrytContext.Provider value={{ maAvbryte, setMaAvbryte }}>{children}</AvbrytContext.Provider>;
};

export default AvbrytContextProvider;
