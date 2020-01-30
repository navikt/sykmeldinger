import React from 'react';

import App from '../App';

/*
Denne komponenten vises kun i dev-modus, og lar deg skifte mellom ulike sykmeldinger.
*/

const DemoWrapper = () => {
    return (
        <>
            <select
                style={{ position: 'absolute', right: 0, zIndex: 1, width: 20, background: 'white' }}
                name="sykmeldinger"
                id="sykmelding-select"
                onChange={event => {
                    console.log(event.target.value);
                }}
                value="init"
            >
                <option key="init" value="">
                    -- Bytt sykmelding --
                </option>
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
            <App sykmeldingId="asd" />
        </>
    );
};

export default DemoWrapper;
