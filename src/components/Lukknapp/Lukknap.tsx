import NavFrontendChevron from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import './Lukknapp.less';

interface LukknappProps {
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Lukknapp: React.FC<LukknappProps> = ({ onClick }) => (
    <button type="button" onClick={onClick} className="lukknapp">
        <Element className="button-text">Lukk</Element>
        <NavFrontendChevron type="opp" />
    </button>
);

export default Lukknapp;
