import { useEffect } from 'react';

type TriggerType =
    | 'SYKMELDINGER'
    | 'OK_APEN'
    | 'OK_BEKREFTET'
    | 'OK_SENDT'
    | 'OK_AVBRUTT'
    | 'OK_UTGATT'
    | 'INVALID_APEN'
    | 'INVALID_BEKREFTET';

class HotjarWindow extends Window {
    hj?: (name: string, value: string) => void;
}

const useHotjarTrigger = (triggerType: TriggerType) => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            setTimeout(() => {
                const hotjarWindow = new HotjarWindow();

                if (hotjarWindow.hj !== undefined) {
                    hotjarWindow.hj('trigger', triggerType);
                    console.info(`Hotjar triggered for ${triggerType}`);
                } else {
                    console.warn('Hotjar was not found on window');
                }
            }, 500);
        } else {
            console.info(`Not loading Hotjar ${triggerType} because the application is not in production`);
        }
    }, [triggerType]);
};

export default useHotjarTrigger;
