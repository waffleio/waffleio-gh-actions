const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('checklistChecker', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should add merged label on closed event if PR was merged', async () => {
    let eventData, isIncompleteChecklist
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "closed",
            "pull_request": {
              "number": 54,
              "merged": true
            }
          }`

    await app.prChecker()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel.mock.calls[0][4]).toContain('PR Merged')
  })

  it('should add NOT merged label on closed event if PR was closed but not merged', async () => {
    let eventData, isIncompleteChecklist
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "closed",
            "pull_request": {
              "number": 54,
              "merged": false
            }
          }`

    await app.prChecker()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel.mock.calls[0][4]).toContain('PR Closed')
  })

  it('should NOT add a label PR was not closed', async () => {
    let eventData, isIncompleteChecklist
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "edited",
            "pull_request": {
              "number": 54,
              "merged": false
            }
          }`

    await app.prChecker()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(0)
  })
})
