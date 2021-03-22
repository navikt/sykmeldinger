import './Diagnoseseksjon.less';

import React from 'react';

import EtikettMedTekst from '../../layout/EtikettMedTekst';
import { Diagnose } from '../../../../../../types/sykmelding/MedisinskVurdering';

interface DiagnoseSeksjonProps {
    diagnose?: Diagnose;
    isBidiagnose?: boolean;
}

const DiagnoseSeksjon = ({ diagnose, isBidiagnose }: DiagnoseSeksjonProps) => {
    if (!diagnose) {
        return null;
    }

    const tittel = isBidiagnose ? 'Bidiagnose' : 'Diagnose';

    return (
        <div className="diagnose-section">
            <div className="diagnose-section__element">
                <EtikettMedTekst
                    tittel={tittel}
                    tekst={diagnose.tekst}
                    undertekst="Diagnosen vises ikke til arbeidsgiveren"
                />
            </div>
            <div className="diagnose-section__element">
                <EtikettMedTekst tittel="Diagnosekode" tekst={`${diagnose.kode} ${diagnose.system}`} />
            </div>
        </div>
    );
};

export default DiagnoseSeksjon;
