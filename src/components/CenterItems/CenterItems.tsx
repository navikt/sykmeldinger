import cn from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './CenterItems.module.css';

interface CenterItemsProps {
    vertical?: boolean;
    horizontal?: boolean;
}

function CenterItems({
    vertical = false,
    horizontal = false,
    children,
}: PropsWithChildren<CenterItemsProps>): JSX.Element {
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
}

export default CenterItems;
