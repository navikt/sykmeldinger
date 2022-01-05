import { Element } from 'nav-frontend-typografi';
import './ListEntry.less';

interface ListEntryProps {
    listText: string[];
    listTitle: string;
}

const ListEntry: React.FC<ListEntryProps> = ({ listText, listTitle }) => {
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
};

export default ListEntry;
