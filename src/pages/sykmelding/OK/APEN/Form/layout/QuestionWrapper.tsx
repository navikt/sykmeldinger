import React from 'react';

interface QuestionWrapperProps {
    backgroundColor?: '#E4EDF2';
}

const QuestionWrapper: React.FC<QuestionWrapperProps> = ({ children, backgroundColor }) => {
    return (
        <div style={{ marginTop: '3rem', backgroundColor, padding: backgroundColor ? '1.5rem' : undefined }}>
            {children}
        </div>
    );
};

export default QuestionWrapper;
