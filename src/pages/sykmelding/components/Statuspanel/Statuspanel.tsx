import './Statuspanel.less';
import React from 'react';
import information from './information.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import StatuspanelSection from './StatuspanelSection';
import StatuspanelHeader from './StatuspanelHeader';
import SykmeldingStatus from '../../../../types/sykmelding/SykmeldingStatus';

interface StatuspanelProps {
    sykmeldingstatus: SykmeldingStatus;
    erEgenmeldt?: boolean;
    avventendeSykmelding?: boolean;
}

const Statuspanel: React.FC<StatuspanelProps> = ({
    sykmeldingstatus,
    erEgenmeldt = false,
    avventendeSykmelding = false,
}) => {
    return (
        <section id="statuspanel">
            <StatuspanelHeader sykmeldingstatus={sykmeldingstatus} erEgenmeldt={erEgenmeldt} />

            <div id="statuspanel__content">
                <img src={information} alt="informasjon" />

                <div id="statuspanel__sections">
                    <Systemtittel tag="h2">Hva skjer videre?</Systemtittel>

                    <StatuspanelSection show={avventendeSykmelding} title="Avventende sykmelding">
                        Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir
                        lagt til rette for deg på arbeidsplassen. Hvis tilrettelegging ikke er mulig, og du blir helt
                        borte fra jobben, må legen erstatte den avventende sykmeldingen med en ordinær sykmelding hvis
                        arbeidsgiveren din krever det.
                    </StatuspanelSection>

                    <StatuspanelSection title="Har du flere jobber?">
                        Du må levere én sykmelding per jobb. Kontakt den som har sykmeldt deg hvis du trenger flere
                        sykmeldinger.
                    </StatuspanelSection>

                    <StatuspanelSection title="Skal du ut og reise?">
                        <Lenke href="#">Les om hva du må gjøre for å beholde sykepengene.</Lenke>
                    </StatuspanelSection>
                </div>
            </div>
        </section>
    );
};

export default Statuspanel;
