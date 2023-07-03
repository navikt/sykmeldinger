import { lazyNextleton } from 'nextleton'

import SessionRecord from './SessionRecord'

const mockDb = lazyNextleton('mock-db-11', () => new SessionRecord())

export default mockDb
