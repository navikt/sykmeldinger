import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Office2 = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fillRule="evenodd"
            d="M2 22h10v-8H2v8Zm8-10H0v12h24V0H10v12Zm2 0h2v10h8V2H12v10Zm6 6V4h2v14h-2ZM4 18h6v-2H4v2Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Office2
