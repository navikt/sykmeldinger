import { BodyShort, Heading } from '@navikt/ds-react'

import SladdSvg from '../../Svg/SladdSvg'

interface SykmeldingEntryProps {
    title: string
    mainText: string
    subText?: string | null
    small?: boolean
    sladd?: boolean
}

function SykmeldingEntry({ title, mainText, subText, small, sladd = false }: SykmeldingEntryProps): JSX.Element {
    if (small) {
        return (
            <div className="[&:not(:last-child)]:mb-3">
                <Heading size="xsmall" level="4">
                    {title}
                </Heading>
                {sladd ? <SladdSvg /> : <BodyShort size="small">{mainText}</BodyShort>}
            </div>
        )
    }

    return (
        <div className="[&:not(:last-child)]:mb-3">
            <Heading size="xsmall" level="4">
                {title}
            </Heading>
            {sladd ? <SladdSvg /> : <BodyShort size="small">{mainText}</BodyShort>}
            {!!subText && <BodyShort size="small">{subText}</BodyShort>}
        </div>
    )
}

export default SykmeldingEntry
