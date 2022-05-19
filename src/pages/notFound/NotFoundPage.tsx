import Veilederpanel from 'nav-frontend-veilederpanel';

import VeilederMaleSvg from '../../components/Veileder/svg/VeilederMaleSvg';

import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.limit}>
            <Veilederpanel svg={<VeilederMaleSvg />}>
                Oisann! Du har kommet til en side som ikke eksisterer
            </Veilederpanel>
        </div>
    );
};

export default NotFoundPage;
