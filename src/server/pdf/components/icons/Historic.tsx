import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const Historic = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 4.063V0H1v8h8V6H4c1.825-2.43 4.73-4 8-4 5.523 0 10 4.477 10 10 0 2.411-.852 4.62-2.272 6.347l1.544 1.27A11.954 11.954 0 0 0 24 12c0-6.627-5.373-12-12-12a11.972 11.972 0 0 0-9 4.063ZM16.375 16.78 11 12.48V6h2v5.52l4.625 3.7-1.25 1.56ZM0 11v2h2v-2H0Zm1 7v-2h2v2H1Zm4 4h2v-2H5v2Zm8 2h-2v-2h2v2Zm4-2h2v-2h-2v2Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default Historic
