import React from 'react';
import information from './information.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './FormInfoMessage.less';

interface FormInfoMessageProps {
    message: string;
    className?: string;
}

const FormInfoMessage = ({ message, className }: FormInfoMessageProps) => {
    return (
        <div className={`form-info-message ${className}`}>
            <img src={information} alt="information" />
            <Normaltekst>{message}</Normaltekst>
        </div>
    );
};

export default FormInfoMessage;
