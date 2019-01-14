console.log('started nodejs...')

const helpers = require('./helpers')

//require octokit rest.js
//more info at https://github.com/octokit/rest.js
const octokit = require('@octokit/rest')()

//set octokit auth to action's GITHUB_TOKEN env variable
octokit.authenticate({
  type: 'app',
  token: process.env.GITHUB_TOKEN
})

//set eventOwner and eventRepo based on action's env variables
const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY
const eventOwner = helpers.getOwner(eventOwnerAndRepo)
const eventRepo = helpers.getRepo(eventOwnerAndRepo)

async function prChecker() {
  //read contents of action's event.json
  const eventData = await helpers.readFilePromise(
    '..' + process.env.GITHUB_EVENT_PATH
  )
  const eventJSON = JSON.parse(eventData)

  //set eventAction and eventIssueNumber
  eventAction = eventJSON.action
  eventIssueNumber = eventJSON.issue.number
  eventIssueBody = eventJSON.issue.body
  eventMerged = eventJSON.merged

  //set label for issues with incomplete checklist items
  const prMergedLabel = '✅ Merged'
  const prNotMergedLabel = '⛔ Closed Without Merging'

  //check if action was closed
  if (eventAction === 'closed') {
    if (eventMerged) {
      console.log('merged - apply merged label')

      //open issue - incomplete checklist - adding label
      helpers.addLabel(
        octokit,
        eventOwner,
        eventRepo,
        eventIssueNumber,
        prMergedLabel
      )
    } else {
      console.log('NOT merged - apply NOT merged label')

      //open issue - incomplete checklist - adding label
      helpers.addLabel(
        octokit,
        eventOwner,
        eventRepo,
        eventIssueNumber,
        prNotMergedLabel
      )
    }
  }
}

//run the function
prChecker()

module.exports.prChecker = prChecker
