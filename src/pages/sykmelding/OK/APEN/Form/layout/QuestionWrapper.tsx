import './QuestionWrapper.less';

interface QuestionWrapperProps {
    innrykk?: boolean;
}

const QuestionWrapper: React.FC<QuestionWrapperProps> = ({ children, innrykk = false }) => {
    return <div className={`question-wrapper ${innrykk ? 'question-wrapper--innrykk' : ''}`}>{children}</div>;
};

export default QuestionWrapper;
