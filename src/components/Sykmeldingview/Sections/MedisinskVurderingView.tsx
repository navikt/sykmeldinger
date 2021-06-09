import MedisinskVurdering, { AnnenFraverGrunn } from '../../../models/Sykmelding/MedisinskVurdering';
import DateFormatter from '../../../utils/DateFormatter';
import CheckboxEntry from '../Layout/CheckboxEntry/CheckboxEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const MedisinskVurderingView: React.FC<{ medisinskVurdering?: MedisinskVurdering; arbeidsgiver?: boolean }> = ({
    medisinskVurdering,
    arbeidsgiver = false,
}) => {
    if (!medisinskVurdering) {
        return null;
    }

    if (arbeidsgiver) {
        if (!medisinskVurdering.hovedDiagnose && medisinskVurdering.biDiagnoser.length === 0) {
            return null;
        }

        return (
            <div style={{ marginBottom: '2rem' }}>
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
        <div style={{ marginBottom: '2rem' }}>
            {!!medisinskVurdering.hovedDiagnose?.tekst && (
                <SykmeldingEntry title="Diagnose" mainText={medisinskVurdering?.hovedDiagnose?.tekst} />
            )}
            {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                if (bidiagnose.tekst) {
                    return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} />;
                }
                return null;
            })}
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
            <CheckboxEntry show={medisinskVurdering.svangerskap} checkboxText="Sykdommen er svangerskapsrelatert" />
            <CheckboxEntry
                show={medisinskVurdering.yrkesskade}
                checkboxText="Sykdommen kan skyldes en yrkesskade/yrkessykdom"
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
