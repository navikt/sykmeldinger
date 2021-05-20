import { Undertittel } from 'nav-frontend-typografi';
import './Section.less';

const Section: React.FC<{ title?: string }> = ({ title, children }) => {
    return (
        <div className="opplysning-section">
            {title && <Undertittel className="opplysning-section__title">{title}</Undertittel>}
            {children}
        </div>
    );
};

export default Section;
