import { useEffect } from 'react';
import { logger } from '../utils/logger';

type TriggerType =
    | 'SYKMELDINGER'
    | 'OK_APEN'
    | 'OK_BEKREFTET'
    | 'OK_SENDT'
    | 'OK_AVBRUTT'
    | 'OK_UTGATT'
    | 'INVALID_APEN'
    | 'INVALID_BEKREFTET';

interface HotjarWindow extends Window {
    hj?: (name: string, value: string) => void;
}

type HotjarFunction = (name: string, value: string) => void;

function isHotjarFunction(hj: unknown): hj is HotjarFunction {
    // check if function takes at least two arguments
    return typeof hj === 'function' && hj.prototype.constructor.length >= 2;
}

const useHotjarTrigger = (triggerType: TriggerType) => {
    useEffect(() => {
        if (window._env_?.RUNTIME_ENVIRONMENT === 'production') {
            setTimeout(() => {
                const hotjarWindow = window as HotjarWindow;

                if (isHotjarFunction(hotjarWindow.hj)) {
                    hotjarWindow.hj('trigger', triggerType);
                } else {
                    logger.warn('Hotjar was not found on window');
                }
            }, 1000);
        } else {
            console.info(`Not loading Hotjar ${triggerType} because the application is not in production`);
        }
    }, [triggerType]);
};

export default useHotjarTrigger;
