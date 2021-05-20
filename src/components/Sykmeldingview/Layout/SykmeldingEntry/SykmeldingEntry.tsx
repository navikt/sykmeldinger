import { Element, Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import SladdSvg from '../../Svg/SladdSvg';
import './SykmeldingEntry.less';

interface SykmeldingEntryProps {
    title: string;
    mainText: string;
    subText?: string;
    small?: boolean;
    sladd?: boolean;
}

const SykmeldingEntry: React.FC<SykmeldingEntryProps> = ({ title, mainText, subText, small, sladd = false }) => {
    if (small) {
        return (
            <div className="sykmelding-entry">
                <UndertekstBold>{title}</UndertekstBold>
                {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            </div>
        );
    }
    return (
        <div className="sykmelding-entry">
            <Element>{title}</Element>
            {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            {!!subText && <UndertekstBold>{subText}</UndertekstBold>}
        </div>
    );
};

export default SykmeldingEntry;
