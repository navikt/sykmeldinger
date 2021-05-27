import { Normaltekst } from 'nav-frontend-typografi';
import './CheckboxEntry.less';

const CheckboxSvg = () => (
    <svg
        version="1.1"
        id="Outline_Version"
        x="0px"
        y="0px"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        enableBackground="new 0 0 24 24"
    >
        <g>
            <g>
                <path
                    d="M9,18.75c-0.132,0-0.26-0.052-0.354-0.146l-5-5c-0.195-0.195-0.195-0.512,0-0.707s0.512-0.195,0.707,0l4.606,4.606
                    L21.111,2.436c0.173-0.215,0.488-0.249,0.703-0.075c0.215,0.173,0.249,0.488,0.075,0.703l-12.5,15.5
                    c-0.089,0.11-0.221,0.178-0.362,0.186C9.018,18.75,9.009,18.75,9,18.75z"
                />
            </g>
            <g>
                <path
                    d="M18.5,24h-18C0.224,24,0,23.776,0,23.5v-18C0,5.224,0.224,5,0.5,5H13c0.276,0,0.5,0.224,0.5,0.5S13.276,6,13,6H1v17h17V12
                    c0-0.276,0.224-0.5,0.5-0.5S19,11.724,19,12v11.5C19,23.776,18.776,24,18.5,24z"
                />
            </g>
        </g>
    </svg>
);

interface CheckboxEntryProps {
    show: boolean;
    checkboxText: string | string[];
}

const CheckboxEntry: React.FC<CheckboxEntryProps> = ({ show, checkboxText }) => {
    if (show) {
        return (
            <div className="checkbox-entry">
                {Array.isArray(checkboxText) ? (
                    checkboxText.map((str, index) => (
                        <div key={index} className="checkbox-entry__checkbox">
                            <CheckboxSvg />
                            <Normaltekst className="checkbox-entry__text">{str}</Normaltekst>
                        </div>
                    ))
                ) : (
                    <div className="checkbox-entry__checkbox">
                        <CheckboxSvg />
                        <Normaltekst className="checkbox-entry__text">{checkboxText}</Normaltekst>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default CheckboxEntry;
