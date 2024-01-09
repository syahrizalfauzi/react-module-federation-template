import React, { useEffect, useState } from 'react';

import styles from './index.module.css';

type CounterProps = {
    count?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

const Counter: React.FC<CounterProps> = ({ count, onDecrement, onIncrement }) => {
    const [current, setCurrent] = useState(count ?? 0);

    useEffect(() => {
        if (count === undefined) return;
        setCurrent(count);
    }, [count]);

    const handleIncrement = () => {
        setCurrent(current + 1);

        if (onIncrement) {
            onIncrement();
        }
    };

    const handleDecrement = () => {
        setCurrent(current - 1);
        if (onDecrement) {
            onDecrement();
        }
    };

    return (
        <div>
            this is from module_main
            <button className={styles.incrementButton} type="button" onClick={handleDecrement}>
                -
            </button>
            <span>{current}</span>
            <button className={styles.decrementButton} type="button" onClick={handleIncrement}>
                +
            </button>
        </div>
    );
};

export default Counter;
