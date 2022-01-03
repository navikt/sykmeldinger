import MedisinskVurdering, { AnnenFraverGrunn } from '../../../models/Sykmelding/MedisinskVurdering';
import DateFormatter from '../../../utils/DateFormatter';
import JaEntry from '../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';
import './MedisinskVurderingView.less';

interface MedisinskVurderingViewProps {
    medisinskVurdering?: MedisinskVurdering;
    arbeidsgiver: boolean;
}

const MedisinskVurderingView: React.FC<MedisinskVurderingViewProps> = ({ medisinskVurdering, arbeidsgiver }) => {
    if (!medisinskVurdering) {
        return null;
    }

    if (arbeidsgiver) {
        if (!medisinskVurdering.hovedDiagnose && medisinskVurdering.biDiagnoser.length === 0) {
            return null;
        }

        return (
            <div className="medisinsk-vurdering-view">
                {!!medisinskVurdering.hovedDiagnose?.tekst && (
                    <SykmeldingEntry title="Diagnose" mainText={medisinskVurdering?.hovedDiagnose?.tekst} sladd />
                )}
                {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} sladd />;
                    }
                    return null;
                })}
            </div>
        );
    }

    return (
        <div className="medisinsk-vurdering-view">
            <div className="diagnoser">
                {!!medisinskVurdering.hovedDiagnose?.tekst && (
                    <SykmeldingEntry title="Diagnose" mainText={medisinskVurdering?.hovedDiagnose?.tekst} />
                )}
                {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} />;
                    }
                    return null;
                })}
            </div>
            {!!(
                medisinskVurdering.annenFraversArsak?.grunn && medisinskVurdering.annenFraversArsak?.grunn.length > 0
            ) && (
                <SykmeldingEntry
                    title="Annen lovfestet fraværsgrunn"
                    mainText={AnnenFraverGrunn[medisinskVurdering.annenFraversArsak.grunn[0]]}
                />
            )}
            {!!medisinskVurdering.annenFraversArsak?.beskrivelse && (
                <SykmeldingEntry
                    title="Beskrivelse av fraværsgrunn"
                    mainText={medisinskVurdering.annenFraversArsak.beskrivelse}
                    small
                />
            )}
            <JaEntry show={medisinskVurdering.svangerskap} title="Er sykdommen svangerskapsrelatert?" />
            <JaEntry
                show={medisinskVurdering.yrkesskade}
                title="Kan sykdommen skyldes en yrkesskade/yrkessykdom?"
            />
            {!!medisinskVurdering.yrkesskadeDato && (
                <SykmeldingEntry
                    title="Skadedato"
                    mainText={DateFormatter.toReadableDate(medisinskVurdering.yrkesskadeDato)}
                />
            )}
        </div>
    );
};

export default MedisinskVurderingView;
