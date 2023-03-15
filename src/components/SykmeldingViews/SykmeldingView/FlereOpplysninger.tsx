import { PropsWithChildren } from 'react'
import { Accordion } from '@navikt/ds-react'
import { Findout } from '@navikt/ds-icons'

function FlereOpplysninger({ children }: PropsWithChildren): JSX.Element {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header className="aria-expanded:bg-transparent">
                    <div className="flex items-center gap-3 text-blue-600">
                        <Findout role="img" aria-hidden className="shrink-0 text-2xl" />
                        Flere opplysninger
                    </div>
                </Accordion.Header>
                <Accordion.Content className="p-0 px-2">{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default FlereOpplysninger
