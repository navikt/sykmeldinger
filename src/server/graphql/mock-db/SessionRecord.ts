import { logger } from '@navikt/next-logger'

import MockDb from './MockDb'
import { scenarios, Scenarios } from './scenarios'

/**
 * Keeps track of the mock database for each session by session id. Should only have a single instance per server.
 */
class SessionRecord {
    private _dbs: Record<string, MockDb> = {}

    get(sessionId: string): MockDb {
        if (this._dbs[sessionId] == null) {
            this._dbs[sessionId] = new MockDb(scenarios.normal.scenario())
        }

        return this._dbs[sessionId]
    }

    set(sessionId: string, scenario: Scenarios): void {
        logger.info(`Setting scenario ${scenario} for session ${sessionId}`)
        this._dbs[sessionId] = new MockDb(scenarios[scenario].scenario())
    }
}

export default SessionRecord
