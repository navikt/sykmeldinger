import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './Spinner.less';

interface SpinnerProps {
    headline: string;
}

const Spinner = ({ headline }: SpinnerProps) => (
    <div className="spinner-container">
        <Undertittel style={{ marginBottom: '15px' }}>{headline}</Undertittel>
        <NavFrontendSpinner />
    </div>
);

export default Spinner;
