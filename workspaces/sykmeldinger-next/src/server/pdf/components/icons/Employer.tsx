import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Employer = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fillRule="evenodd"
            d="M17 7A5 5 0 1 1 7 7a5 5 0 0 1 10 0Zm2 0A7 7 0 1 1 5 7a7 7 0 0 1 14 0Zm-6 17v-5h-2v5l-2.778-8.334A11.011 11.011 0 0 0 1.182 24h2.041a9.012 9.012 0 0 1 3.829-5.52L8.892 24H13Zm7.777 0h2.042a11.01 11.01 0 0 0-7.041-8.334L13 24h2.108l1.84-5.52A9.012 9.012 0 0 1 20.777 24ZM13 16v2h-2v-2h2Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Employer
