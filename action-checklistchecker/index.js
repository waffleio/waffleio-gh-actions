console.log("started nodejs...")

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

  
async function checklistChecker() {

    //read contents of action's event.json
    eventData = await helpers.readFilePromise('..' + process.env.GITHUB_EVENT_PATH)
    eventJSON = JSON.parse(eventData) 

    //set eventAction and eventIssueNumber
    eventAction = eventJSON.action
    eventIssueNumber = eventJSON.issue.number
    eventIssueBody = eventJSON.issue.body

    //check if there are incomplete checklist items        
    let incompleteChecklist = helpers.checkForIncompleteChecklist(eventIssueBody)

    //set label for issues with incomplete checklist items
    const incompleteTasksLabel = 'Incomplete Tasks'

    console.log('event action: ' + eventAction)

    //if an issue was opened, edited, or reopened
    if (eventAction === 'opened' || eventAction === 'edited' || eventAction === 'reopened') {

        if (incompleteChecklist) {
            helpers.addLabel(octokit, eventOwner, eventRepo, eventIssueNumber, incompleteTasksLabel)
        } else {
            helpers.removeLabel(octokit, eventOwner, eventRepo, eventIssueNumber, incompleteTasksLabel)
        }
    }

    //if an issue was closed
    if (eventAction === 'closed') { 

        if (incompleteChecklist) {
            helpers.reopenIssue(octokit, eventOwner, eventRepo, eventIssueNumber)
            helpers.addLabel(octokit, eventOwner, eventRepo, eventIssueNumber, incompleteTasksLabel)
        } else {
            helpers.removeLabel(octokit, eventOwner, eventRepo, eventIssueNumber, incompleteTasksLabel)
        }
    }
}

//run the function
checklistChecker()