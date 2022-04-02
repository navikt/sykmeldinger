import { Element, Undertekst, UndertekstBold } from 'nav-frontend-typografi';

import SladdSvg from '../../Svg/SladdSvg';

import styles from './SykmeldingEntry.module.css';

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
            <div className={styles.sykmeldingEntry}>
                <UndertekstBold>{title}</UndertekstBold>
                {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            </div>
        );
    }

    return (
        <div className={styles.sykmeldingEntry}>
            <Element>{title}</Element>
            {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            {!!subText && <UndertekstBold>{subText}</UndertekstBold>}
        </div>
    );
};

export default SykmeldingEntry;
