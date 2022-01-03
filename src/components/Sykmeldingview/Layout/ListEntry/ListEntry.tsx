import { Element } from 'nav-frontend-typografi';
import './ListEntry.less';

interface ListEntryProps {
    show: boolean;
    listText: string[];
    listTitle: string;
}

const ListEntry: React.FC<ListEntryProps> = ({ show, listText, listTitle }) => {
    if (show) {
        return (
            <div className="list-entry">
                <Element>{listTitle}</Element>
                <ul>
                    {listText.map((str, index) => (
                        <li className="list-entry__text" key={index}>{str}</li>
                    ))}
                </ul>
            </div>
        );
    }
    return null;
};

export default ListEntry;
