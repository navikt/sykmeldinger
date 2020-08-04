import { useEffect, useState, useRef } from 'react';

const usePoll = (callback: () => any, until: boolean, delayMs: number, maxIntervalMs: number) => {
    const [limitReached, setLimitReached] = useState<boolean>(false);

    const interval = useRef<NodeJS.Timeout>();
    const timeout = useRef<NodeJS.Timeout>();

    const startInterval = () => {
        console.log(limitReached);
        if (timeout.current && interval.current) {
            clearTimeout(timeout.current);
            clearInterval(interval.current);
        }

        timeout.current = setTimeout(() => {
            setLimitReached(true);
            if (interval.current) {
                clearInterval(interval.current);
            }
        }, maxIntervalMs);

        interval.current = setInterval(() => {
            callback();
        }, delayMs);
    };

    useEffect(() => {
        if (until && interval.current && timeout.current) {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            setLimitReached(false);
        }
    }, [until]);

    useEffect(() => {
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return { startInterval, limitReached };
};

export default usePoll;
