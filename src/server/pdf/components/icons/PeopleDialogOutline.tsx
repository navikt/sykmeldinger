import { Path, Svg } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types'

interface Props {
    style: Style
}

const PeopleDialogOutline = ({ style }: Props): ReactElement => (
    <Svg width="22" height="22" viewBox="0 0 24 24" style={style}>
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 3a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3.764L14 10.618V3Zm7 0h-5v4.382L16.764 7H21V3ZM7.5 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm0 12a4.5 4.5 0 1 1 9 0v.5h2v-.5a6.5 6.5 0 1 0-13 0v.5h2v-.5Z"
            fill="currentColor"
        ></Path>
    </Svg>
)

export default PeopleDialogOutline
