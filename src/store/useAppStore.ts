import createUseContext from 'constate';
import { useState } from 'react';

const useAppStore = createUseContext(() => {
    const [sykmeldinger, setSykmeldinger] = useState<any[] | null>(null);
    const [valgtSykmelding, setValgtSykmelding] = useState<any | null>(null);

    return {
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding
    };
});

export default useAppStore;
