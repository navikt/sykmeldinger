import { ReactElement } from 'react'
import { useId } from '@navikt/ds-react'

function SladdSvg(): ReactElement {
    const patternId = useId()

    return (
        <svg width="246" height="39" viewBox="0 0 246 39" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
            <title>Sladdet bilde</title>
            <pattern id={patternId} patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#3E3832', strokeWidth: '1' }} />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
    )
}

export default SladdSvg
