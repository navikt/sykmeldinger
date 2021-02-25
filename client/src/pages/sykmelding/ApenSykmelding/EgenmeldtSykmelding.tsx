import React from 'react';
import { Sykmelding } from '../../../types/sykmelding';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Sykmeldingsopplysninger from '../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';

interface EgenmeldtSykmeldingProps {
    sykmelding: Sykmelding;
}

const EgenmeldtSykmelding: React.FC<EgenmeldtSykmeldingProps> = ({ sykmelding }) => {
    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--2">
                <AlertStripeSuksess>
                    <Undertittel>Egenmeldingen er bekreftet og sendt til NAV</Undertittel>
                    Dato sendt: {dayjs(sykmelding.sykmeldingStatus.timestamp).format('D. MMM YYYY, kl. hh:mm')}
                </AlertStripeSuksess>
            </div>

            <Sykmeldingsopplysninger id="flere-sykmeldingsopplysnigner" title="Opplysninger fra sykmeldingen">
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
                ))}
            </Sykmeldingsopplysninger>
        </div>
    );
};

export default EgenmeldtSykmelding;
