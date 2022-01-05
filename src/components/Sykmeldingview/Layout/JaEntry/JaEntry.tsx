import { Element } from 'nav-frontend-typografi';
import './JaEntry.less';

interface JaEntryProps {
    title: string;
}

const JaEntry: React.FC<JaEntryProps> = ({ title }) => {
    return (
        <div className="ja-entry">
            <Element>{title}</Element>
            <p className="ja-entry__text">Ja</p>
        </div>
    );
};

export default JaEntry;
