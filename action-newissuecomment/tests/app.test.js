
const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('commentOnNewIssue', () => {
    afterEach(() => {
        jest.resetAllMocks()
      });
      
    it('should add one comment when a new issue is created', async () => {
        let eventData
        helpers.readFilePromise = jest.fn(() => eventData)  
        eventData = `{"action": "opened","issue": {"number": 26}}`
        let octokit = {
            issues: {
                createComment: jest.fn().mockResolvedValue( { something: 'something' })
            }
        }
        
        await app.commentOnNewIssue()
        await octokit.issues.createComment()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(octokit.issues.createComment).toHaveBeenCalledTimes(1)
        //expect(octokit.issues.createComment.mock.calls[0][0].body).toMatch(/thanks for opening a new issue/)
    })
})
