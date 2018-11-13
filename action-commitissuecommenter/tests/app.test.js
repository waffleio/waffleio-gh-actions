
const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('commitChecker', () => {
    afterEach(() => {
        jest.resetAllMocks()
      });
      
    it('should add one comment if the branch does include the issue number and one commit does include a comment', async () => {
        let eventData, issueNumberFromBranch, commentFromCommit
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.getIssueFromBranch = jest.fn(() => issueNumberFromBranch)
        helpers.checkForCommitActions = jest.fn(() => commentFromCommit)   
        eventData = `{
            "ref": "refs/heads/22-mybranch",
            "commits": [
              {
                "id": "4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "message": "pushing more code #comment let my product owner know @azolyak",
                "url": "https://github.com/adamzolyak/actions-playground/commit/4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "author": {
                  "name": "Adam Zolyak",
                  "email": "adam.zolyak@gmail.com",
                  "username": "adamzolyak"
                }
              }
            ]
        }`
        issueNumberFromBranch = '1'
        commentFromCommit = 'this is a comment'

        await app.commitChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.getIssueFromBranch).toHaveBeenCalledTimes(1)
        expect(helpers.checkForCommitActions).toHaveBeenCalledTimes(1)
        expect(helpers.addComment).toHaveBeenCalledTimes(1)
    })

    it('should add two comments if the branch does include the issue number and two commits do include a comment', async () => {
        let eventData, issueNumberFromBranch, commentFromCommit
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.getIssueFromBranch = jest.fn(() => issueNumberFromBranch)
        helpers.checkForCommitActions = jest.fn(() => commentFromCommit)   
        eventData = `{
            "ref": "refs/heads/22-mybranch",
            "commits": [
              {
                "id": "4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "message": "pushing more code #comment let my product owner know @azolyak",
                "url": "https://github.com/adamzolyak/actions-playground/commit/4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "author": {
                  "name": "Adam Zolyak",
                  "email": "adam.zolyak@gmail.com",
                  "username": "adamzolyak"
                }
              },
              {
                "id": "4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "message": "pushing more code #comment let my product owner know @azolyak",
                "url": "https://github.com/adamzolyak/actions-playground/commit/4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "author": {
                  "name": "Adam Zolyak",
                  "email": "adam.zolyak@gmail.com",
                  "username": "adamzolyak"
                }
              }
            ]
        }`
        issueNumberFromBranch = '1'
        commentFromCommit = 'this is a comment'

        await app.commitChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.getIssueFromBranch).toHaveBeenCalledTimes(1)
        expect(helpers.checkForCommitActions).toHaveBeenCalledTimes(2)
        expect(helpers.addComment).toHaveBeenCalledTimes(2)
    })

    it('should not add a comment if the branch includes the issue number and the commit does NOT includes a comment', async () => {
        let eventData, issueNumberFromBranch, commentFromCommit
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.getIssueFromBranch = jest.fn(() => issueNumberFromBranch)
        helpers.checkForCommitActions = jest.fn(() => commentFromCommit)   
        eventData = `{
            "ref": "refs/heads/22-mybranch",
            "commits": [
              {
                "id": "4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "message": "pushing more code",
                "url": "https://github.com/adamzolyak/actions-playground/commit/4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "author": {
                  "name": "Adam Zolyak",
                  "email": "adam.zolyak@gmail.com",
                  "username": "adamzolyak"
                }
              }
            ]
        }`
        issueNumberFromBranch = '1'
        commentFromCommit = false

        await app.commitChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.getIssueFromBranch).toHaveBeenCalledTimes(1)
        expect(helpers.checkForCommitActions).toHaveBeenCalledTimes(1)
        expect(helpers.addComment).toHaveBeenCalledTimes(0)
    })

    it('should not add a comment if the branch does NOT includes the issue number and the commit does include a comment', async () => {
        let eventData, issueNumberFromBranch, commentFromCommit
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.getIssueFromBranch = jest.fn(() => issueNumberFromBranch)
        helpers.checkForCommitActions = jest.fn(() => commentFromCommit)   
        eventData = `{
            "ref": "refs/heads/22-mybranch",
            "commits": [
              {
                "id": "4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "message": "pushing more code",
                "url": "https://github.com/adamzolyak/actions-playground/commit/4df31bc856208019b09a2f1b5d8bc055a819fdc8",
                "author": {
                  "name": "Adam Zolyak",
                  "email": "adam.zolyak@gmail.com",
                  "username": "adamzolyak"
                }
              }
            ]
        }`
        issueNumberFromBranch = false
        commentFromCommit = 'this is a comment'

        await app.commitChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.getIssueFromBranch).toHaveBeenCalledTimes(1)
        expect(helpers.checkForCommitActions).toHaveBeenCalledTimes(0)
        expect(helpers.addComment).toHaveBeenCalledTimes(0)
    })
})
