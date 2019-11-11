import React, { useState, useEffect, useRef } from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import { Radio } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import TidslinjeMedArbeidsgiver from '../components/tidslinje/TidslinjeMedArbeidsgiver';
import './TidslinjeSide.less';
import TidslinjeUtenArbeidsgiver from '../components/tidslinje/TidslinjeUtenArbeidsgiver';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Hva skjer under sykefraværet?',
        sti: '/tidslinje',
        erKlikkbar: false,
    },
];

const TidslinjeSide: React.FC = () => {
    const [harArbeidsgiver, setHarArbeidsgiver] = useState(true);

    const radioEndring = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value === 'med-arbg') {
            setHarArbeidsgiver(true);
        } else if (e.target.value === 'uten-arbg') {
            setHarArbeidsgiver(false);
        }
    };

    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler}></Brodsmuler>
            <Sidetittel className="sidetittel">Hva skjer under sykefraværet?</Sidetittel>
            <Tekstomrade className="infoheader">
                På tidslinjen ser du hva som forventes av deg i løpet av sykefraværet. Oppgavene kan gjøres på andre
                tidspunkter hvis det er behov for det. Hvis du er for syk til å delta i jobb eller aktivitet, kan du få
                unntak fra enkelte av oppgavene
            </Tekstomrade>
            <div className="arbeidssituasjon">
                <Radio
                    label={'Jeg har arbeidsgiver'}
                    name="arbeidssituasjon"
                    value="med-arbg"
                    checked={harArbeidsgiver}
                    onChange={radioEndring}
                    className="arbeidssituasjon__med-arbg"
                />
                <Radio
                    label={
                        <div className="arbeidssituasjon__uten-arbg-label">
                            Jeg har ikke arbeidsgiver
                            <Hjelpetekst className="arbeidssituasjon__hjelpetekst">
                                Velg «Jeg har ikke arbeidsgiver» dersom du er for eks. selvstendig næringsdrivende,
                                frilanser eller arbeidsledig.
                            </Hjelpetekst>
                        </div>
                    }
                    name="arbeidssituasjon"
                    value="uten-arbg"
                    onChange={radioEndring}
                    checked={!harArbeidsgiver}
                />
            </div>
            <span className="tidslinje">
                {harArbeidsgiver && <TidslinjeMedArbeidsgiver />}
                {!harArbeidsgiver && <TidslinjeUtenArbeidsgiver />}
            </span>
        </div>
    );
};

export default TidslinjeSide;
