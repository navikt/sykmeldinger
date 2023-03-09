import { FileContent } from '@navikt/ds-icons'

import { UtdypendeOpplysning } from '../../../../../fetching/graphql.generated'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'

interface Props {
    utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>>
}

function UtdypendeOpplysninger({ utdypendeOpplysninger }: Props): JSX.Element | null {
    if (Object.keys(utdypendeOpplysninger).length === 0) return null

    return (
        <div>
            <SykmeldtHeading title="Utdypende opplysninger" Icon={FileContent} />
            {Array.from(Object.values(utdypendeOpplysninger)).map((innerMap) => {
                return Array.from(
                    Object.values(innerMap).map((utdypendeOpplysning, index) => {
                        if (utdypendeOpplysning.sporsmal) {
                            return (
                                <div className="mb-3 rounded bg-gray-50 p-4" key={index}>
                                    <SykmeldingEntry
                                        title={utdypendeOpplysning.sporsmal}
                                        mainText={utdypendeOpplysning.svar}
                                    />
                                </div>
                            )
                        }
                        return null
                    }),
                )
            })}
        </div>
    )
}

export default UtdypendeOpplysninger
