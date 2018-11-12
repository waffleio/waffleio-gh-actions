const app = require('../index')
const helpers = require('../helpers')
let octokit = require('@octokit/rest')()

octokit = jest.fn()
octokit.authenticate = jest.fn()

describe('index', () => {
    it('should something', () => {
        expect(1 + 1).toBe(2)
    })
})