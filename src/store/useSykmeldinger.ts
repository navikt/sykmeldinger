import { useState } from 'react';

const useSykmeldinger = () => {
    const [sykmeldinger, setSykmeldinger] = useState<any[] | null>(null);

    return [sykmeldinger, setSykmeldinger];
}