import cn from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './QuestionWrapper.module.css';

interface QuestionWrapperProps {
    innrykk?: boolean;
}

function QuestionWrapper({ children, innrykk = false }: PropsWithChildren<QuestionWrapperProps>): JSX.Element {
    return <div className={cn(styles.questionWrapper, { [styles.innrykk]: innrykk })}>{children}</div>;
}

export default QuestionWrapper;
