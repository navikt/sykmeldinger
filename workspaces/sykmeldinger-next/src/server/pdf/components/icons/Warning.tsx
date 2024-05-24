import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Warning = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fillRule="evenodd"
            d="M12 0a1 1 0 0 1 .894.553l11 22A1 1 0 0 1 23 24H1a1 1 0 0 1-.894-1.447l11-22A1 1 0 0 1 12 0Zm-1 15V8h2v7h-2Zm2.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Warning
