import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Calender = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fillRule="evenodd"
            d="M6 7V5H2v5h20V5h-4v2a1 1 0 1 1-2 0V5H8v2a1 1 0 1 1-2 0Zm10-4H8V1a1 1 0 1 0-2 0v2H2a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4V1a1 1 0 1 0-2 0v2ZM2 12v10h20V12H2Zm6 3a1 1 0 0 0-1-1H5a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1Zm-1 3a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h2Zm6-4h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2Zm-2 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm9-3a1 1 0 0 0-1-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1Zm-4 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Calender
