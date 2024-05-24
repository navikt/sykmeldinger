import { useEffect, useRef } from 'react'

import useWindowFocus from './useWindowFocus'

function useFocusRefetch(refetch: () => void): void {
    const focus = useWindowFocus()
    const initialLoad = useRef<boolean>(true)

    useEffect(() => {
        // Don't refetch when page does the initial render with data
        if (initialLoad.current) {
            initialLoad.current = false
            return
        }

        if (focus) refetch()
    }, [focus, refetch])
}

export default useFocusRefetch
