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

describe('getParent', () => {
  it('child of - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child of #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio')
    expect(result.parentRepo).toBe('waffle.io')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child to - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child to #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio')
    expect(result.parentRepo).toBe('waffle.io')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio')
    expect(result.parentRepo).toBe('waffle.io')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('mutiline issue body - should return parent info with child owner/repo if parent owner/repo is NOT provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody =
      'to do\r\n- [ ] thing\r\n- [x] thing\r\n\r\n[bug, que]\r\nchild of #59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio')
    expect(result.parentRepo).toBe('waffle.io')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child of - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child of waffleio2/waffle.io2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio2')
    expect(result.parentRepo).toBe('waffle.io2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child to - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child to waffleio2/waffle.io2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio2')
    expect(result.parentRepo).toBe('waffle.io2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('child - should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'child waffleio2/waffle.io2#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result.parentOwner).toBe('waffleio2')
    expect(result.parentRepo).toBe('waffle.io2')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('should return parent info with parent owner/repo if parent owner/repo is provided', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody =
      'to do\r\n- [ ] thing\r\n- [x] thing\r\n\r\n[bug, que]\r\nchild of waffleio3/waffle.io3#59'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    console.log('multiline result', result)

    expect(result.parentOwner).toBe('waffleio3')
    expect(result.parentRepo).toBe('waffle.io3')
    expect(result.parentIssueNumber).toBe('59')
  })

  it('should return false if no parent relationship', async () => {
    const eventOwner = 'waffleio'
    const eventRepo = 'waffle.io'
    const issueBody = 'this is an issue without a parent'

    const result = await helpers.getParent(eventOwner, eventRepo, issueBody)

    expect(result).toBe(false)
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
      ['Incomplete Tasks', 'Help Wanted']
    )
    expect(octokit.issues.addLabels).toHaveBeenCalledTimes(1)
    expect(octokit.issues.addLabels.mock.calls[0][0].labels).toEqual([
      'Incomplete Tasks',
      'Help Wanted'
    ])
  })
})

describe('removeLabel', () => {
  it('should remove label from issue', async () => {
    let octokit = {
      issues: {
        removeLabel: jest.fn().mockResolvedValue({ something: 'something' })
      }
    }

    const result = await helpers.removeLabel(
      octokit,
      'waffleio',
      'waffle.io',
      '1',
      'Incomplete Tasks'
    )
    expect(octokit.issues.removeLabel).toHaveBeenCalledTimes(1)
    expect(octokit.issues.removeLabel.mock.calls[0][0].name).toEqual(
      'Incomplete Tasks'
    )
  })
})
