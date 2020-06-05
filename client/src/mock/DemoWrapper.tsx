import React from 'react';

import App from '../App';
import { StatusTyper } from '../types/sykmeldingTypes';

/*
Denne komponenten vises kun i dev-modus, og lar deg skifte mellom ulike sykmeldinger.
*/

const DemoWrapper = () => {
    const demoSykmeldinger = new Map<string, string>([
        ['Ny sykmelding', '/fravaer/steg-1-variasjon-1-a/ny-sykmelding-variasjon-1-sykmelding'],
        ['Sendt sykmelding', '/fravaer/steg-1-variasjon-1-b/ferdig-sykmelding-variasjon-1-sykmelding-a'],
    ]);

    if (process.env.REACT_APP_MOCK_BACKEND) {
        return (
            <>
                <select
                    style={{ position: 'absolute', right: 0, zIndex: 1, background: 'white' }}
                    name="sykmeldinger"
                    id="sykmelding-select"
                    onChange={(event) => {
                        console.log(event.target.value);
                        window.location.href = event.target.value;
                    }}
                    defaultValue="init"
                >
                    <option key="init" value="">
                        -- Velg sykmelding --
                    </option>
                    {Array.from(demoSykmeldinger.entries()).map(([key, value], index) => (
                        <option key={index} value={value}>
                            {key}
                        </option>
                    ))}
                </select>
                <button
                    style={{ position: 'absolute' }}
                    onClick={() => {
                        fetch(`${process.env.REACT_APP_API_URL}/reset`);
                        window.location.reload();
                    }}
                >
                    Reset
                </button>
                <App />
            </>
        );
    } else {
        return (
            <>
                <select
                    style={{ position: 'absolute', right: 0, zIndex: 1, background: 'white' }}
                    name="sykmeldinger"
                    id="sykmelding-select"
                    onChange={(event) => {
                        console.log(event.target.value);
                        window.location.href = event.target.value;
                    }}
                    defaultValue="init"
                >
                    <option key="init" value="">
                        -- Velg sykmelding --
                    </option>
                    {Object.keys(StatusTyper).map((key, index) => (
                        <option key={index} value={`${process.env.REACT_APP_SYKMELDING_ROOT}/${key}`}>
                            {key}
                        </option>
                    ))}
                </select>
                <App />
            </>
        );
    }
};

export default DemoWrapper;
