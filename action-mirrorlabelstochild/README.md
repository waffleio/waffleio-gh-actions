# 👩‍👧‍👦 Mirror Labels to Child - GitHub Action

A [GitHub Action](https://github.com/features/actions) that works with Waffle.io's parent / child relationships to automatically mirror labels from parents to children 👩‍👧‍👦.

## How It Works

This GitHub Action runs when an [`issues` event webhook](https://developer.github.com/v3/activity/events/types/#issuesevent) is fired in your GitHub repo. The action checks if there are incomplete checklist items `- [ ] to do` in markdown in the issue's description. If there is 1 or > incomplete checklist items, the action labels the issue with "Incomplete Items". Also, if the issue is closed with incomplete checklist items, the action will reopen the issue and comment on the issue.

## Installation

To use this GitHub Action, you must have access to [GitHub Actions](https://github.com/features/actions). GitHub Actions are currently only available in private beta (you must [apply for access](https://github.com/features/actions)) and only work in private repos.

To setup this action:

1. Create a `.github/main.workflow` in your GitHub repo.
2. Add the following code to the `main.workflow` file and commit it to the repo's `master` branch.

```
workflow "Issue Checklist Checker" {
  resolves = ["CheckChecklist"]
  on = "issues"
}

action "CheckChecklist" {
  uses = "waffleio/gh-actions/action-checklistchecker@master"
  secrets = ["GITHUB_TOKEN"]
}
```

3. Whenever you create, update, close, or reopen an issue, the action will run!

## Examples

Example of issue with incomplete checklist items in the description labeled with "Incomplete Tasks" label:
![GitHub Logo](./docs/issuewlabel.png)

Example of re-opened issue with incomplete checklist items in the description labeled with "Incomplete Tasks" label:
![GitHub Logo](./docs/issuereopened.png)

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
export GITHUB_EVENT_PATH="/action-checklistchecker/tests/fixtures/actionTrigger.json"

node index.js
```

3. modify contents of [/tests/fixtures/actionTrigger.json](./tests/fixtures/actionTrigger.json) as needed for test data
4. run `bash dev` to run locally
