import { randomUUID } from 'crypto'

import { lazyNextleton } from 'nextleton'

import SessionRecord from './SessionRecord'

const key = randomUUID()
const mockDb = lazyNextleton(key, () => new SessionRecord())

export default mockDb
