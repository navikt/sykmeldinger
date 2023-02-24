import { Resolvers, Svartype } from './resolver-types.generated'

const objectResolvers: Partial<Resolvers> = {
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
