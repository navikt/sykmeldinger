import { Element, Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import SladdSvg from '../Svg/SladdSvg';

interface SykmeldingEntryProps {
    title: string;
    mainText: string;
    subText?: string;
    small?: boolean;
    margin?: boolean;
    sladd?: boolean;
}

const SykmeldingEntry: React.FC<SykmeldingEntryProps> = ({
    title,
    mainText,
    subText,
    small,
    margin = true,
    sladd = false,
}) => {
    if (small) {
        return (
            <div className="sykmelding-entry" style={{ marginTop: '-1rem', marginBottom: margin ? '2rem' : '' }}>
                <UndertekstBold>{title}</UndertekstBold>
                {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            </div>
        );
    }
    return (
        <div className="sykmelding-entry" style={{ marginBottom: margin ? '2rem' : '' }}>
            <Element>{title}</Element>
            {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            {!!subText && <UndertekstBold>{subText}</UndertekstBold>}
        </div>
    );
};

export default SykmeldingEntry;
