import { ReactElement, PropsWithChildren } from 'react'
import { ExpansionCard } from '@navikt/ds-react'
import { FileSearchIcon } from '@navikt/aksel-icons'

function FlereOpplysningerSykmeldt({ children }: PropsWithChildren): ReactElement {
    return (
        <ExpansionCard aria-labelledby="flere-opplysninger-heading">
            <ExpansionCard.Header>
                <div className="flex items-center gap-4">
                    <div className="mt-1.5 grid shrink-0 place-content-center text-4xl">
                        <FileSearchIcon role="img" aria-hidden />
                    </div>
                    <ExpansionCard.Title id="flere-opplysninger-heading" as="h2">
                        Flere opplysninger
                    </ExpansionCard.Title>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default FlereOpplysningerSykmeldt
