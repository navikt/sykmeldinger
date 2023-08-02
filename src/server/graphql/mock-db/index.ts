import { lazyNextleton } from 'nextleton'

import SessionRecord from './SessionRecord'

const mockDb = lazyNextleton('mock-db', () => new SessionRecord())

export default mockDb
