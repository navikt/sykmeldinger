import { lazyNextleton } from 'nextleton'

import SessionRecord from './SessionRecord'

const mockDb = lazyNextleton('mock-db-8', () => new SessionRecord())

export default mockDb
