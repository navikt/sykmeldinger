import { lazyNextleton } from 'nextleton'

import SessionRecord from './SessionRecord'

const mockDb = lazyNextleton('mock-db-2', () => new SessionRecord())

export default mockDb
