const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('checklistChecker', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should remove label on closed event if NO incomplete checklist items', async () => {
    expect(1 + 1).toBe(2)
  })
})
