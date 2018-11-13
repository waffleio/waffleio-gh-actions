# 💬 Commit Issue Commenter - GitHub Action

A [GitHub Action](https://github.com/features/actions) that helps your team communicate and collaborate before you open a PR. 

## How It Works

This GitHub Action runs when an [`push` event webhook](https://developer.github.com/v3/activity/events/types/#pushevent) is fired in your GitHub repo.  The action checks for a `#comment your message goes here` in commit messages and added them as a comment on the related issue if the branch name includes the issue number in the `#issueNumber-something-something` format.

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