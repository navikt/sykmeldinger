import { useEffect } from 'react'

function useWarnUnsavedPopup(shouldWarn: boolean): void {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
            if (shouldWarn) {
                e.preventDefault()
                // setter returnValue til tom streng fordi https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [shouldWarn])
}

export default useWarnUnsavedPopup
