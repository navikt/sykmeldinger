import { authenticatedGet } from './Fetch';
import fetchMock from 'fetch-mock-jest';

describe('Fetch', () => {
    const testUrl = 'test-url';

    afterEach(() => {
        fetchMock.mockReset();
    });

    it('Invokoes callback if response is 200', async () => {
        fetchMock.get(testUrl, { status: 200, body: {} });
        const mockCallback = jest.fn();

        await authenticatedGet(testUrl, mockCallback);

        expect(mockCallback).toBeCalledTimes(1);
    });

    it('Throws error if response is 401', async () => {
        fetchMock.get(testUrl, { status: 401 });
        const mockCallback = jest.fn();

        expect.assertions(2);
        try {
            await authenticatedGet(testUrl, mockCallback);
        } catch (e) {
            expect(e.message).toMatch('Sesjonen er utløpt. Vi videresender deg til innloggingssiden.');
        }

        expect(mockCallback).not.toBeCalled();
    });
});
