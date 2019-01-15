const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('mirrorLabelsToChild', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should add label to child if child has parent with label(s)', async () => {
    let eventData, parentData, labelData
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getParent = jest.fn(() => parentData)
    helpers.getLabels = jest.fn(() => labelData)
    helpers.addLabel = jest.fn()
    eventData = `{
        "action": "opened",
        "issue": {
            "number": 20,
            "title": "child issue",
            "state": "open",
            "body": "child of #10"
        }
    }`
    parentData = {
      parentOwner: 'waffleio',
      parentRepo: 'waffle.io',
      parentIssueNumber: '10'
    }
    labelData = [
      {
        name: 'label 1'
      },
      {
        name: 'label 2'
      }
    ]

    await app.mirrorLabelsToChild()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getParent).toHaveBeenCalledTimes(1)
    expect(helpers.getLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(1)
  })

  it('should NOT add label to child if child has parent with NO label(s)', async () => {
    let eventData, parentData, labelData
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getParent = jest.fn(() => parentData)
    helpers.getLabels = jest.fn(() => labelData)
    helpers.addLabel = jest.fn()
    eventData = `{
        "action": "opened",
        "issue": {
            "number": 20,
            "title": "child issue",
            "state": "open",
            "body": "child of #10"
        }
    }`
    parentData = {
      parentOwner: 'waffleio',
      parentRepo: 'waffle.io',
      parentIssueNumber: '10'
    }
    labelData = []

    await app.mirrorLabelsToChild()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getParent).toHaveBeenCalledTimes(1)
    expect(helpers.getLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(0)
  })

  it('should NOT add label to child if child has NO parent', async () => {
    let eventData, parentData, labelData
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getParent = jest.fn(() => parentData)
    helpers.getLabels = jest.fn(() => labelData)
    helpers.addLabel = jest.fn()
    eventData = `{
        "action": "opened",
        "issue": {
            "number": 20,
            "title": "child issue",
            "state": "open",
            "body": "this issue has no parent"
        }
    }`

    await app.mirrorLabelsToChild()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getParent).toHaveBeenCalledTimes(1)
    expect(helpers.getLabels).toHaveBeenCalledTimes(0)
    expect(helpers.addLabel).toHaveBeenCalledTimes(0)
  })
})
