import React from 'react';

import styles from './index.module.css';

type HeadingProps = {
    children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ children }) => {
    return <h3 className={styles.heading}>{children}</h3>;
};

export default Heading;
