import { BodyShort, Heading } from '@navikt/ds-react'

interface JaEntryProps {
    title: string
}

function JaEntry({ title }: JaEntryProps): JSX.Element {
    return (
        <div>
            <Heading size="xsmall" level="4">
                {title}
            </Heading>
            <BodyShort size="small" className="mb-2 pl-4 pt-2">
                Ja
            </BodyShort>
        </div>
    )
}

export default JaEntry
