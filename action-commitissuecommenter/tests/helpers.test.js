const helpers = require('../helpers')
let octokit = require('@octokit/rest')()

octokit = jest.fn()
octokit.authenticate = jest.fn()

describe('getOwner', () => {
    it('should return owner when passed GITHUB_REPOSITORY env variable', () => {
        const result = helpers.getOwner('waffleio/waffle.io')
        expect(result).toBe('waffleio')
    })
})

describe('getRepo', () => {
    it('should return repo when passed GITHUB_REPOSITORY env variable', () => {
        const result = helpers.getRepo('waffleio/waffle.io')
        expect(result).toBe('waffle.io')
    })
})

describe('getIssueFromBranch', () => {
    it('should return false if branch does NOT start with issue number', async () => {  
        const ref = 'refs/heads/mybranch'
        const result = helpers.getIssueFromBranch(ref)
        expect(result).toBe(false)
    })

    it('should return issue number if branch does start with issue number', async () => {  
        const ref = 'refs/heads/22-mybranch'
        const result = helpers.getIssueFromBranch(ref)
        expect(result).toBe('22')
    })
})

describe('checkForCommitActions', () => {
    it('should return false if commit does NOT include a comment', async () => {  
        const commitMessage = 'added initial ui'
        const result = helpers.checkForCommitActions(commitMessage)
        expect(result).toBe(false)
    })

    it('should return false if commit does NOT include a comment', async () => {  
        const commitMessage = 'added initial ui #comment fyi @adamzolyak you might want to check this out'
        const result = helpers.checkForCommitActions(commitMessage)
        expect(result).toBe('fyi @adamzolyak you might want to check this out')
    })
})

describe('addComment', () => {
    it('should reopen the specified issue', async () => {  
        
        let octokit = {
            issues: {
                createComment: jest.fn().mockResolvedValue( { something: 'something' })
            }
        }

        const result = await helpers.addComment(octokit, 'waffleio', 'waffle.io', '1', 'this is a comment')
        expect(octokit.issues.createComment).toHaveBeenCalledTimes(1)
        expect(octokit.issues.createComment.mock.calls[0][0].body).toMatch(/this is a comment/)
    })
})
