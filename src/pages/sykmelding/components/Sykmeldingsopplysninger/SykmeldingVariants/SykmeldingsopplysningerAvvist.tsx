import React from 'react';
import { Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import ArbeidsgiverSeksjon from '../panelelementer/ArbeidsgiverSeksjon';
import DiagnoseSeksjon from '../panelelementer/diagnose/DiagnoseSeksjon';
import LegeSeksjon from '../panelelementer/LegeSeksjon';
import SykmeldingPerioder from '../panelelementer/periode/SykmeldingPerioder';

interface SykmeldingsopplysningerAvvistProps {
    sykmelding: Sykmelding;
}

const SykmeldingsopplysningerAvvist: React.FC<SykmeldingsopplysningerAvvistProps> = ({ sykmelding }) => (
    <>
        <SykmeldingPerioder sykmelding={sykmelding} />
        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
        {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
            <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
        ))}
        <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
        {/* TODO: typesafety */}
        <LegeSeksjon navn={sykmelding.navnFastlege || ''} />
    </>
);

export default SykmeldingsopplysningerAvvist;
