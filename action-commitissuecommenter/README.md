# 💬 Commit Issue Commenter - GitHub Action

A [GitHub Action](https://github.com/features/actions) that helps your team communicate and collaborate before you open a PR. 

## How It Works

This GitHub Action runs when an [`push` event webhook](https://developer.github.com/v3/activity/events/types/#pushevent) is fired in your GitHub repo.  The action checks for a `#comment your message goes here` in commit messages and added them as a comment on the related issue if the branch name includes the issue number in the `#issueNumber-something-something` format.  You can also notify other people by @mentioning their GitHub username in the comment `#comment your message goes here and notifies @person`.

Since GitHub Actions currently only support actions within the same repo, this action currently only supports comments in on issues and commit in the same repo.

## Installation

To use this GitHub Action, you must have access to [GitHub Actions](https://github.com/features/actions).  GitHub Actions are currently only available in private beta (you must [apply for access](https://github.com/features/actions)) and only work in private repos.

To setup this action:
1. Create a `.github/main.workflow` in your GitHub repo.
2. Add the following code to the `main.workflow` file and commit it to the repo's `master` branch.
```
workflow "Commit Issue Commenter" {
  resolves = ["CommentFromCommit"]
  on = "push"
}

action "CommentFromCommit" {
  uses = "waffleio/gh-actions/action-commitissuecommenter@master"
  secrets = ["GITHUB_TOKEN"]
}
```
3. Whenever you push changes to GitHub, the action will run!

## Examples

Example of issue before work has started:
![GitHub Logo](/docs/issue.png)

Example of creating a branch referencing issue #24 and adding a comment in the commit message:
![GitHub Logo](/docs/brancwcomment.png)

Example of issue with comment from commit:
![GitHub Logo](/docs/issuewcomment.png)

## Extending

See [extending](../README.md#extending) in main README.

### To run tests locally

1. run `npm install` to install dependencies
2. run `npm test` to run tests

### To run action locally

1. `npm install` to install dependencies
2. create a `dev` file with the following contents:
```bash
export GITHUB_TOKEN="12345"
export GITHUB_REPOSITORY="adamzolyak/actions-playground"
export GITHUB_EVENT_PATH="/action-commitissuecommenter/tests/fixtures/actionTrigger.json"

node index.js
```
3. modify contents of [/tests/fixtures/actionTrigger.json](./tests/fixtures/actionTrigger.json) as needed for test data
4. run `bash dev` to run locally
