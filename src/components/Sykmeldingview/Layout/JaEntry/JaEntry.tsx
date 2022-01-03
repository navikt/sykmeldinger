import { Element } from 'nav-frontend-typografi';
import './JaEntry.less';

interface JaEntryProps {
    show: boolean;
    title: string;
}

const JaEntry: React.FC<JaEntryProps> = ({ show, title }) => {
    if (show) {
        return (
            <div className="ja-entry">
                <Element>{title}</Element>
                <p className="ja-entry__text">Ja</p>
            </div>
        );
    }
    return null;
};

export default JaEntry;
