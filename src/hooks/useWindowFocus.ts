import { useState, useEffect } from 'react'

const hasFocus = (): boolean => typeof document !== 'undefined' && document.hasFocus()

function useWindowFocus(): boolean {
    const [focused, setFocused] = useState(hasFocus)

    useEffect(() => {
        setFocused(hasFocus())

        const onFocus = (): void => setFocused(true)
        const onBlur = (): void => setFocused(false)

        window.addEventListener('focus', onFocus)
        window.addEventListener('blur', onBlur)

        return () => {
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('blur', onBlur)
        }
    }, [])

    return focused
}

export default useWindowFocus
