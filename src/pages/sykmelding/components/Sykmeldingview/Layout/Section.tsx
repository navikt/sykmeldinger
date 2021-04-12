import { Undertittel } from 'nav-frontend-typografi';

const Section: React.FC<{ title: string }> = ({ title, children }) => {
    return (
        <div>
            <Undertittel style={{ marginBottom: '1rem' }}>{title}</Undertittel>
            {children}
        </div>
    );
};

export default Section;
