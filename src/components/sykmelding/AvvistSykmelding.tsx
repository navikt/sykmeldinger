import React, { useRef, useEffect } from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    const thirdRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div className="sykmelding-container">avvist</div>;
};

export default AvvistSykmelding;
