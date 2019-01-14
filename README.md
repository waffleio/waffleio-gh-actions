# GitHub Actions from Waffle.io 🏃🏃🏃

[GitHub Actions](https://github.com/features/actions) are a great way to automate and customize your team's workflow in GitHub 🏃.

[Waffle.io](https://waffle.io/features/) is developer-first project management for GitHub, helping teams stay aligned and automate their workflow. While [WaffleBot 🤖 already automates 100,000+ actions per month](https://waffle.io/features/automation) to keep your Waffle boards update for you, our users are always asking to automate more and more things. While we'd love to automate #AllTheThings, some uses cases are specific to you and your team. [GitHub Actions](https://github.com/features/actions) are great for these use cases!

This repo includes [GitHub Actions](https://github.com/features/actions) contributed by Waffle.io and examples of how to create your own [GitHub Actions](https://github.com/features/actions) for your own use cases 🛠.

Fork 🍴 this repo to use as a starting point to create your own GitHub Actions. What will you automate in your workflow 🤖?

## GitHub Actions from Waffle.io

- 📣 [New Issue Comment action](/action-newissuecomment) - an action that thanks contributors for creating a new issue and provide a link to your repo's CONTRIBUTING.md guidelines.
- ✅ [Issue Checklist Checker action](/action-checklistchecker) - an action that labels issues with incomplete checklists and enforces complete checklists to close issue.
- 💬 [Commit Issue Commenter action](/action-commitissuecommenter) - an action that adds comments to an issue from commit messages.
- 🏷 [Bulk Labels action](/action-bulklabels) - an action that adds multiple labels to an issue from the issue's description when creating an issue. Useful when creating a lot of issues, especially children of Epics.
- 🚗 [PR Closed Labeler](/action-prmergelabel) - an action that labels closed pull requests as either merged or closed (without merging).
- 🚊 [Monorepo PR Repo Labeler](/action-prmonorepolabel) - ac action that labels pull requests with the repo(s) that are impacted.

## Create Your Own GitHub Action

We recommend starting by checking out our [New Issue Comment action](/action-newissuecomment). It's a good example of a basic GitHub Action that updates an GitHub issue via the GitHub API.

## Contributing

If you have suggestions for how Waffle.io's GitHub Actions could be improved, or want to report a bug, open an issue! Or pull request! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

This project uses [Waffle.io](https://waffle.io/waffleio/waffle.io) to keep track of issue and pull request status.

[![Waffle.io - Columns and their card count](https://badge.waffle.io/waffleio/waffle.io.svg?columns=all)](https://waffle.io/waffleio/waffle.io)

### Debugging

If you've followed the steps above and it isn't working, trying the following:

- If you don't see an Actions tab in your repo, make sure your repo is private and make sure you've been accepted into the private beta.
- If you see the Actions tab but there isn't a comment on your new issue, click on the Log link on the action to view the log and check for errors.

## Extending

Some helpful resources:

- [GitHub Actions Docs](https://developer.github.com/actions/)
- [Octokit Rest.js Docs](https://octokit.github.io/rest.js/#api-Issues-createComment)
- [Dockerfile Docs](https://docs.docker.com/engine/reference/builder/)

## License

[ISC](LICENSE) © 2018 Waffle.io <team@waffle.io> (www.waffle.io)
