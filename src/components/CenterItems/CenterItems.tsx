import cn from 'classnames';

import styles from './CenterItems.module.css';

interface CenterItemsProps {
    vertical?: boolean;
    horizontal?: boolean;
}

const CenterItems: React.FC<CenterItemsProps> = ({ vertical = false, horizontal = false, children }) => {
    return (
        <div
            className={cn(styles.centerItems, {
                [styles.centerItemsVertical]: vertical,
                [styles.centerItemsHorizontal]: horizontal,
            })}
        >
            {children}
        </div>
    );
};

export default CenterItems;
