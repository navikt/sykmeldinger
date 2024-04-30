import { prettifyOrgName } from '../../utils/orgUtils'

import { Resolvers, Svartype } from './resolver-types.generated'

const objectResolvers: Partial<Resolvers> = {
    ArbeidsgiverStatus: {
        orgNavn: (parent) => prettifyOrgName(parent.orgNavn),
    },
    Arbeidsgiver: {
        navn: (parent) => prettifyOrgName(parent.navn),
    },
    TidligereArbeidsgiver: {
        orgNavn: (parent) => prettifyOrgName(parent.orgNavn),
    },
    SvarTypeUnion: {
        __resolveType: (parent) => {
            switch (parent.svarType) {
                case Svartype.ARBEIDSSITUASJON:
                    return 'ArbeidssituasjonSvar'
                case Svartype.DAGER:
                    return 'DagerSvar'
                case Svartype.JA_NEI:
                    return 'JaNeiSvar'
                case Svartype.PERIODER:
                    return 'PerioderSvar'
            }
        },
    },
}

export default objectResolvers
