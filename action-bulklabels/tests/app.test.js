const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('checklistChecker', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should add 1 label on issue opened event if there is 1 bulk label', async () => {
    let eventData, repoLabels
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getBulkLabels = jest.fn(() => bulkLabels)
    helpers.getRepoLabels = jest.fn(() => repoLabels)
    helpers.addShortLabelName = jest.fn(() => repoShortLabels)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "to do\\r\\n- [ ] thing\\r\\n- [x] thing\\r\\n\\r\\n[bug]"
            }
        }`
    bulkLabels = ['bug']
    repoLabels = `[
            {
              "name": "bug"
            },
            {
              "name": "enhancement"
            }
          ]`
    repoShortLabels = [
      {
        name: 'bug',
        shortLabelName: 'bug'
      },
      {
        name: 'enhancement',
        shortLabelName: 'enh'
      }
    ]

    await app.bulkLabelAdd()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getBulkLabels).toHaveBeenCalledTimes(1)
    expect(helpers.getRepoLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addShortLabelName).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(1)
  })

  it('should add 2 labels on issue opened event if there are 2 bulk labels', async () => {
    let eventData, repoLabels
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getBulkLabels = jest.fn(() => bulkLabels)
    helpers.getRepoLabels = jest.fn(() => repoLabels)
    helpers.addShortLabelName = jest.fn(() => repoShortLabels)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "to do\\r\\n- [ ] thing\\r\\n- [x] thing\\r\\n\\r\\n[bug, enh]"
            }
        }`
    bulkLabels = ['bug', 'enh']
    repoLabels = `[
            {
              "name": "bug"
            },
            {
              "name": "enhancement"
            }
          ]`
    repoShortLabels = [
      {
        name: 'bug',
        shortLabelName: 'bug'
      },
      {
        name: 'enhancement',
        shortLabelName: 'enh'
      }
    ]

    await app.bulkLabelAdd()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getBulkLabels).toHaveBeenCalledTimes(1)
    expect(helpers.getRepoLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addShortLabelName).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(2)
  })

  it('should NOT add a label on issue opened event if the bulk label does NOT exist in the repo', async () => {
    let eventData, repoLabels
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getBulkLabels = jest.fn(() => bulkLabels)
    helpers.getRepoLabels = jest.fn(() => repoLabels)
    helpers.addShortLabelName = jest.fn(() => repoShortLabels)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "to do\\r\\n- [ ] thing\\r\\n- [x] thing\\r\\n\\r\\n[bug]"
            }
        }`
    bulkLabels = ['bug']
    repoLabels = `[
            {
              "name": "enhancement"
            }
          ]`
    repoShortLabels = [
      {
        name: 'enhancement',
        shortLabelName: 'enh'
      }
    ]

    await app.bulkLabelAdd()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getBulkLabels).toHaveBeenCalledTimes(1)
    expect(helpers.getRepoLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addShortLabelName).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(0)
  })

  it('should NOT add a label on issue opened event if there is no bulk label', async () => {
    let eventData, repoLabels
    helpers.readFilePromise = jest.fn(() => eventData)
    helpers.getBulkLabels = jest.fn(() => bulkLabels)
    helpers.getRepoLabels = jest.fn(() => repoLabels)
    helpers.addShortLabelName = jest.fn(() => repoShortLabels)
    helpers.addLabel = jest.fn()
    eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "to do\\r\\n- [ ] thing\\r\\n- [x] thing\\r\\n\\r\\n"
            }
        }`
    bulkLabels = []
    repoLabels = `[
            {
              "name": "enhancement"
            }
          ]`
    repoShortLabels = [
      {
        name: 'enhancement',
        shortLabelName: 'enh'
      }
    ]

    await app.bulkLabelAdd()

    expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
    expect(helpers.getBulkLabels).toHaveBeenCalledTimes(1)
    expect(helpers.getRepoLabels).toHaveBeenCalledTimes(1)
    expect(helpers.addShortLabelName).toHaveBeenCalledTimes(1)
    expect(helpers.addLabel).toHaveBeenCalledTimes(0)
  })
})
