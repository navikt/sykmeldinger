import React, { useRef } from 'react';

import Arbeidsevne from '../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import FraverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import Friskmelding from '../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import Sykmeldingsopplysninger from '../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import LegeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import SendingsSkjema from './SendingsSkjema';
import SkadeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import SporsmalInfoheader from './SporsmalInfoheader';
import SvangerskapSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import UtdypendeOpplysninger from '../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';

import { Sykmelding } from '../../../types/sykmelding';
import { Arbeidsgiver } from '../../../types/arbeidsgiver';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../commonComponents/Veileder/svg/VeilederMaleSvg';

import useForm, { ValidationFunctions } from '../../commonComponents/hooks/useForm';
import { Feiloppsummering } from 'nav-frontend-skjema';

interface ApenSykmeldingProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

interface Form {
    prop1: string;
    prop2: number;
    prop3?: string;
    prop4: Date;
}

const validationFunctions: ValidationFunctions<Form> = {
    prop1: (value) => {
        if (!value.prop1) {
            return 'Prop 1 is required';
        }
    },
    prop2: (value) => {
        if (!value.prop2) {
            return 'Prop 2 is required';
        }
    },
    prop3: (value) => {
        if (!value.prop2) {
            return 'This is requires';
        }
    },
    prop4: (value) => {
        if (!value.prop2) {
            return 'This is requires';
        }
    },
};

const ApenSykmelding: React.FC<ApenSykmeldingProps> = ({
    sykmelding,
    arbeidsgivere,
    sykmeldingUtenforVentetid,
}: ApenSykmeldingProps) => {
    const utfyllingRef = useRef<HTMLDivElement>(document.createElement('div'));

    const { formState, errors, setFormState, handleSubmit } = useForm<Form>({
        validationFunctions,
        defaultValues: { prop1: undefined, prop2: undefined },
    });

    console.log(formState);
    console.log(errors);

    return (
        <div className="sykmelding-container">
            <button
                id="prop1"
                onClick={() => {
                    setFormState((state) => ({ ...state, prop1: 'this is a value' }));
                }}
            >
                Set prop1
            </button>
            <button
                id="prop2"
                onClick={() => {
                    setFormState((state) => ({ ...state, prop2: 2 }));
                }}
            >
                Set prop2
            </button>
            <button
                onClick={() => {
                    handleSubmit((state) => {
                        console.log('Submitting!');
                        // state may still be of Partial<Form> if the validation functions are not written properly
                        console.log(state);
                    });
                }}
            >
                submit
            </button>
            {!!errors && <Feiloppsummering tittel="feil" feil={errors} />}
            <div className="margin-bottom--4">
                <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                    Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om?
                    Du velger selv om du vil bruke sykmeldingen.
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger id="sykmeldingsopplysninger" title="Opplysninger fra sykmeldingen">
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering?.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={!!sykmelding.medisinskVurdering?.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Sykmeldingsopplysninger
                    id="flere-sykmeldingsopplysnigner"
                    title="Flere opplysniger fra den som sykmeldte deg"
                    type="FLERE_OPPLYSNINGER"
                    expandedDefault={false}
                >
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <MulighetForArbeid />
                    <Friskmelding prognose={sykmelding.prognose} />
                    <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                    <Arbeidsevne
                        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                        tiltakNAV={sykmelding.tiltakNAV}
                    />
                    <SeksjonMedTittel tittel="Annet">
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </SeksjonMedTittel>
                </Sykmeldingsopplysninger>
            </Sykmeldingsopplysninger>

            {/* TODO: Bestemme om denne skal være i Sporsmal-komponent eller som egen komponent */}
            <div ref={utfyllingRef} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <SporsmalInfoheader />
            </div>

            <SendingsSkjema sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} />
        </div>
    );
};

export default ApenSykmelding;
