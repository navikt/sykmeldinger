import nock from 'nock';

import { authenticatedGet } from './Fetch';

describe('Fetch', () => {
    const apiNock = nock('http://localhost');

    it('Invokoes callback if response is 200', async () => {
        apiNock.get('/test-url').reply(200, {});

        const mockCallback = jest.fn();
        await authenticatedGet('http://localhost/test-url', mockCallback);

        expect(mockCallback).toBeCalledTimes(1);
    });

    it('Throws error if response is 401', async () => {
        apiNock.get('/test-url').reply(401, {});
        const mockCallback = jest.fn();

        await expect(() => authenticatedGet('http://localhost/test-url', mockCallback)).rejects.toThrowError(
            'Sesjonen er utløpt. Vi videresender deg til innloggingssiden.',
        );
        expect(mockCallback).not.toBeCalled();
    });
});
