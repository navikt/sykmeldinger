import React from 'react';
import NaermesteLeder from '../types/naermesteLederTypes';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

interface DinArbeidssituasjonProps {
    naermesteLedere: NaermesteLeder[];
}

const DinArbeidssituasjon: React.FC<DinArbeidssituasjonProps> = ({ naermesteLedere }: DinArbeidssituasjonProps) => {
    return (
        <div className="din-arbsit">
            <div className="din-arbsit__header">
                <img src="" alt="ikon for arbeidssituasjon" />
                <Systemtittel>Din arbeidssituasjon</Systemtittel>
                <img src="" alt="spørsmålstegn ikon" />
            </div>
            {naermesteLedere.map(leder => (
                <div className="din-arbsit__element">
                    <img src="" alt="bygning ikon" />
                    <Normaltekst>Ansatt i {leder.organisasjonsnavn}</Normaltekst>
                    <Normaltekst>Din nærmeste leder er {leder.navn}</Normaltekst>
                    <Lenke href="#">Meld fra om endring</Lenke>
                    <Normaltekst>Arbeidsgiveren din betaler lønn også etter de 16 første dagene.</Normaltekst>
                    <img src="" alt="spørsmålstegn ikon" />
                </div>
            ))}
        </div>
    );
};

export default DinArbeidssituasjon;
