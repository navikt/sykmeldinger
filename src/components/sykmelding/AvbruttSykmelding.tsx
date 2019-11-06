import React, { useRef, useEffect } from 'react';

export type Sykmeldingtype = 'NY' | 'AVVIST_AV_NAV' | 'AVBRUTT_AV_DEG';

interface SykmeldingProps {
    sykmeldingtype: Sykmeldingtype;
}

const AvbruttSykmelding: React.FC<SykmeldingProps> = ({ sykmeldingtype }: SykmeldingProps) => {
    const thirdRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div className="sykmelding-container">avvist</div>;
};

export default AvbruttSykmelding;
