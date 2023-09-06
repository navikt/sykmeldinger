import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const People = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            d="M9 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM6 21a6 6 0 0 1 12 0v1h2v-1a8 8 0 1 0-16 0v1h2v-1Z"
            fill="black"
        ></Path>
    </Svg>
)

export default People
