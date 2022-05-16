import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, GetServerSidePropsResult } from 'next';

import { getPublicEnv, isLocalOrDemo } from '../utils/env';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<unknown>;
type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<unknown>>;

const publicEnv = getPublicEnv();

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler = async () => ({ props: {} })) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        if (isLocalOrDemo) {
            return handler(context);
        }

        const request = context.req;
        const selvbetjeningsToken: string | null | undefined = request.cookies['selvbetjening-idtoken'];
        if (!selvbetjeningsToken) {
            return {
                redirect: {
                    destination: `${publicEnv.LOGIN_SERVICE_URL}?redirect=${publicEnv.LOGIN_SERVICE_REDIRECT_URL}`,
                    permanent: false,
                },
            };
        }

        return handler(context);
    };
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res, ...rest) {
        if (isLocalOrDemo) {
            return handler(req, res, ...rest);
        }

        const selvbetjeningsToken: string | null | undefined = req.cookies['selvbetjening-idtoken'];
        if (!selvbetjeningsToken) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        return handler(req, res, ...rest);
    };
}
