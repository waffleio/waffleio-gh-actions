# 🚊 Monorepo PR Repo Labeler - GitHub Action

A [GitHub Action](https://github.com/features/actions) that labels pull requests with the repo(s) that they impact for [monorepos](https://en.wikipedia.org/wiki/Monorepo).

## How It Works

This GitHub Action runs when an [`pull_request` event webhook](https://developer.github.com/v3/activity/events/types/#issuesevent) is fired in your GitHub repo. The action checks if any of the files in the pull request are in a monorepo repo (ex. `/directory/...` from the root of the monorepo). If one or more monorepos are found, the pull request is labeled with a label for each monorepo repo. Directories that beging with a dot (ex. `/.directory/`) are ignored.

## Installation

To use this GitHub Action, you must have access to [GitHub Actions](https://github.com/features/actions). GitHub Actions are currently only available in private beta (you must [apply for access](https://github.com/features/actions)) and only work in private repos.

To setup this action:

1. Create a `.github/main.workflow` in your GitHub repo.
2. Add the following code to the `main.workflow` file and commit it to the repo's `master` branch.

```
workflow "Monorepo PR Repo Labeler" {
  resolves = ["LabelRepos"]
  on = "pull_request"
}

action "LabelRepos" {
  uses = "waffleio/gh-actions/action-prmonorepolabel@master"
  secrets = ["GITHUB_TOKEN"]
}
```

3. Whenever you open, edit, close, etc a pull request, the action will run!

## Examples

Example of PR that has changes in two monorepo repos:
![GitHub Logo](./docs/labels.png)

Example of monorepo repo structure:
![GitHub Logo](./docs/repos.png)

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
export GITHUB_EVENT_PATH="/action-prmergelabel/tests/fixtures/actionTrigger.json"

node index.js
```

3. modify contents of [/tests/fixtures/actionTrigger.json](./tests/fixtures/actionTrigger.json) as needed for test data
4. run `bash dev` to run locally
