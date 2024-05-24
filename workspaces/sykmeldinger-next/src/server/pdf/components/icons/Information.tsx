import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Information = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM9 19v-2h2v-5H9v-2h4v7h2v2H9Zm3-14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Information
