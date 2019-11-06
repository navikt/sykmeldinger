import React, { useRef, useEffect } from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const NySykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    const thirdRef = useRef<HTMLDivElement>(document.createElement('div'));

    var styles1 = {
        margin: '20px',
        width: '100%',
        height: '250px',
        backgroundColor: 'yellow',
        display: 'inline-block',
    };
    var styles2 = {
        margin: '20px',
        width: '100%',
        height: '200px',
        backgroundColor: 'blue',
        display: 'inline-block',
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sykmelding-container">
            <button onClick={() => window.scrollTo({ top: thirdRef.current.offsetTop - 100, behavior: 'smooth' })}>
                Click for scroll
            </button>
            <div className="first" style={styles1}></div>
            <div className="second" style={styles1}></div>
            <div ref={thirdRef} className="third" style={styles1}>
                Hello World
            </div>
            <div className="first" style={styles2}></div>
            <div className="second" style={styles2}></div>
        </div>
    );
};

export default NySykmelding;
