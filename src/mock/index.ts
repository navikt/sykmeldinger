import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { sykmeldinger} from './data/sykmeldinger';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/syforest/sykmeldinger', sykmeldinger);