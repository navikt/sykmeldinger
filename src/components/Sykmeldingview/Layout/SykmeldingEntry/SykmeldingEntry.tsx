import { Element, Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import cn from 'classnames';

import SladdSvg from '../../Svg/SladdSvg';

import styles from './SykmeldingEntry.module.css';

interface SykmeldingEntryProps {
    title: string;
    mainText: string;
    subText?: string;
    small?: boolean;
    sladd?: boolean;
    borderTop?: boolean;
}

const SykmeldingEntry: React.FC<SykmeldingEntryProps> = ({
    title,
    mainText,
    subText,
    small,
    sladd = false,
    borderTop,
}) => {
    if (small) {
        return (
            <div className={styles.sykmeldingEntry}>
                <UndertekstBold>{title}</UndertekstBold>
                {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            </div>
        );
    }

    return (
        <div className={cn(styles.sykmeldingEntry, { [styles.borderTop]: borderTop })}>
            <Element>{title}</Element>
            {sladd ? <SladdSvg /> : <Undertekst>{mainText}</Undertekst>}
            {!!subText && <UndertekstBold>{subText}</UndertekstBold>}
        </div>
    );
};

export default SykmeldingEntry;
