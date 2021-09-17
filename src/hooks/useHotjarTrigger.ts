import { useEffect } from 'react';
import { logger } from '../utils/logger';
import env from "../utils/env";

type TriggerType =
    | 'SYKMELDING_LISTEVISNING'
    | 'SYKMELDING_OK_APEN'
    | 'SYKMELDING_OK_BEKREFTET'
    | 'SYKMELDING_OK_SENDT'
    | 'SYKMELDING_OK_AVBRUTT'
    | 'SYKMELDING_OK_UTGATT'
    | 'SYKMELDING_INVALID_APEN'
    | 'SYKMELDING_INVALID_BEKREFTET'
    | 'SYKMELDING_KVITTERING';

interface HotjarWindow extends Window {
    hj?: (name: string, value: string) => void;
}

type HotjarFunction = (name: string, value: string) => void;

function isHotjarFunction(hj: unknown): hj is HotjarFunction {
    return typeof hj === 'function';
}

const useHotjarTrigger = (triggerType: TriggerType) => {
    useEffect(() => {
        if (env.RUNTIME_ENVIRONMENT === 'production') {
            setTimeout(() => {
                const hotjarWindow = window as HotjarWindow;

                if (isHotjarFunction(hotjarWindow.hj)) {
                    hotjarWindow.hj('trigger', triggerType);
                } else {
                    logger.warn('Hotjar was not found on window');
                }
            }, 500);
        } else {
            console.info(`Not loading Hotjar ${triggerType} because the application is not in production`);
        }
    }, [triggerType]);
};

export default useHotjarTrigger;
