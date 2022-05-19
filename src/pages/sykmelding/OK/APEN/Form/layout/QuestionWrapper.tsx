import cn from 'classnames';

import styles from './QuestionWrapper.module.css';

interface QuestionWrapperProps {
    innrykk?: boolean;
}

const QuestionWrapper: React.FC<QuestionWrapperProps> = ({ children, innrykk = false }) => {
    return <div className={cn(styles.questionWrapper, { [styles.innrykk]: innrykk })}>{children}</div>;
};

export default QuestionWrapper;
