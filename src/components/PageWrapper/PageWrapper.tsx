import React, { PropsWithChildren } from 'react';

import styles from './PageWrapper.module.css';

const PageWrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return <div className={styles.limit}>{children}</div>;
};

export default PageWrapper;
