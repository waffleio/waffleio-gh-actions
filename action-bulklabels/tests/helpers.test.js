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

describe('getBulkLabels', async () => {
  it('should return 1 bulk label if 1 bulk label exist in the issue body', async () => {
    const eventIssueBody = 'checklist\r\n- [ ] to do\r\n[bug]'
    const result = helpers.getBulkLabels(eventIssueBody)

    expect(Array.isArray(['bug'])).toBe(true)
  })

  it('should return 2 bulk labels if 2 bulk labels exist in the issue body', async () => {
    const eventIssueBody = 'checklist\r\n- [ ] to do\r\n[bug, enh]'
    const result = helpers.getBulkLabels(eventIssueBody)

    expect(Array.isArray(['bug', 'enh'])).toBe(true)
  })

  it('should return 0 bulk labels if 0 bulk labels exist in the issue body', async () => {
    const eventIssueBody = 'checklist\r\n- [ ] to do\r\n'
    const result = helpers.getBulkLabels(eventIssueBody)

    expect(Array.isArray([])).toBe(true)
  })
})

describe('addLabel', () => {
  it('should add label to issue', async () => {
    let octokit = {
      issues: {
        addLabels: jest.fn().mockResolvedValue({ something: 'something' })
      }
    }

    const result = await helpers.addLabel(
      octokit,
      'waffleio',
      'waffle.io',
      '1',
      'Incomplete Tasks'
    )
    expect(octokit.issues.addLabels).toHaveBeenCalledTimes(1)
    expect(octokit.issues.addLabels.mock.calls[0][0].labels).toEqual([
      'Incomplete Tasks'
    ])
  })
})

describe('getRepoLabels', () => {
  it('should return an array of 2 labels if 2 labels exist in repo', async () => {
    const repoLabels = [
      {
        name: 'bug'
      },
      {
        name: 'enhancement'
      }
    ]
    let octokit = {
      issues: {
        listLabelsForRepo: jest.fn().mockResolvedValue(repoLabels)
      }
    }

    const result = await helpers.getRepoLabels(octokit, 'waffleio', 'waffle.io')

    expect(octokit.issues.listLabelsForRepo).toHaveBeenCalledTimes(1)
    expect(result[0].name).toBe('bug')
    expect(result[1].name).toBe('enhancement')
  })

  it('should return an array of 0 labels if 0 labels exist in repo', async () => {
    const repoLabels = []
    let octokit = {
      issues: {
        listLabelsForRepo: jest.fn().mockResolvedValue(repoLabels)
      }
    }

    const result = await helpers.getRepoLabels(octokit, 'waffleio', 'waffle.io')

    expect(octokit.issues.listLabelsForRepo).toHaveBeenCalledTimes(1)
    expect(result.length).toBe(0)
  })
})
