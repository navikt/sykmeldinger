import { MutationResult, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { logger } from '@navikt/next-logger';

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    SubmitSykmeldingDocument,
    SubmitSykmeldingMutation,
    SykmeldingChangeStatus,
} from '../fetching/graphql.generated';
import { FormShape } from '../components/SykmeldingViews/OK/APEN/Form/Form';

export function useChangeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<ChangeSykmeldingStatusMutation>, () => void] {
    const [submit, result] = useMutation(ChangeSykmeldingStatusDocument, {
        variables: {
            sykmeldingId,
            status,
        },
        onCompleted: () => {
            onCompleted();
            window.scrollTo(0, 0);
        },
        onError: () => {
            onError();
        },
    });

    return [
        result,
        () => {
            logger.info(`Client: Changing status for sykmelding ${sykmeldingId} to ${status}`);
            submit();
        },
    ];
}

export function useSubmitSykmelding(
    sykmeldingId: string,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<SubmitSykmeldingMutation>, (values: FormShape) => void] {
    const router = useRouter();
    const [submit, result] = useMutation(SubmitSykmeldingDocument, {
        onCompleted: () => {
            onCompleted();
            window.scrollTo(0, 0);
            router.push(`/${sykmeldingId}/kvittering`);
        },
        onError: () => {
            onError();
        },
    });

    return [
        result,
        (values) => {
            logger.info(`Client: Submitting sykmelding ${sykmeldingId}`);
            submit({ variables: { sykmeldingId, values } });
        },
    ];
}
