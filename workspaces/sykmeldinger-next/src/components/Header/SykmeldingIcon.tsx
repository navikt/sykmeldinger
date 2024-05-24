import { ReactElement } from 'react'

type Props = {
    className?: string
}

function SykmeldingIcon({ className }: Props): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className={className}>
            <defs>
                <clipPath id="a">
                    <path d="M0 0h96v96H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#a)">
                <path fill="#CCF1D6" d="M16 36h64v24H16V36z" display="block" />
                <path fill="#CCF1D6" d="M60 80H36V16h24v64z" display="block" />
                <g display="block">
                    <path
                        fill="none"
                        stroke="#262626"
                        strokeWidth={3}
                        d="M50.364 66.5a8.682 8.682 0 1 1 0 17.364 8.682 8.682 0 0 1 0-17.364zM12.181 35.999H7.09A5.09 5.09 0 0 0 2 41.091v15.272c0 7.029 5.698 12.728 12.728 12.728 7.029 0 12.726-5.699 12.726-12.728V41.091a5.09 5.09 0 0 0-5.09-5.092h-5.091"
                    />
                    <path
                        fill="none"
                        stroke="#262626"
                        strokeWidth={3}
                        d="M14.728 67.545V87.91A5.09 5.09 0 0 0 19.819 93a5.09 5.09 0 0 0 5.091-5.09v-3.819a8.91 8.91 0 0 1 8.909-8.91h8.909"
                    />
                </g>
                <g display="block">
                    <path
                        fill="#262626"
                        d="M96 44.076V6.778c0-.429-.244-2.201-2.708-2L83.5 4.776V2a1.5 1.5 0 1 0-3 0v2.776l-17-.004V2a1.5 1.5 0 1 0-3 0v2.771l-9.861-.002C48.185 4.589 48 6.249 48 7.368v36.828c0 2.493 1.386 2.582 2.663 2.582h43.319c1.173-.031 2.214-.863 2.018-2.702zM60.5 7.778V14a1.5 1.5 0 1 0 3 0V7.778h17V14a1.5 1.5 0 1 0 3 0V7.778H93V21H51V7.778h9.5zM51 24h42v19.778H51V24z"
                    />
                    <path
                        fill="#262626"
                        d="M62 28.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3zM62 36.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3zM74 28.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3zM74 36.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3zM86 28.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3zM86 36.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3z"
                    />
                </g>
            </g>
        </svg>
    )
}

export default SykmeldingIcon
