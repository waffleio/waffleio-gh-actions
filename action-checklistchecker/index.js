console.log("started nodejs...")

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
const slicePos1 = eventOwnerAndRepo.indexOf("/");
const eventOwner = eventOwnerAndRepo.slice(0, slicePos1);
const eventRepo = eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length);


const fs = require('fs')
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
        })
    })
}
  
async function checklistChecker() {

    //read contents of action's event.json
    eventData = await readFilePromise('../github/workflow/event.json')
    eventJSON = JSON.parse(eventData) 

    //set eventAction and eventIssueNumber
    eventAction = eventJSON.action
    eventIssueNumber = eventJSON.issue.number
    eventIssueBody = eventJSON.issue.body

    console.log('event action: ' + eventAction)

    //if a new issue was opened 
    if (eventAction === 'opened' || eventAction === 'edited' || eventAction === 'reopened') {
        console.log("running checklist check")

        var regex1 = RegExp('-\[ \]');

        let incompleteChecklist = regex1.test(eventIssueBody)

        if (incompleteChecklist) {
            //add label 
            octokit.issues.addLabels({
                owner: eventOwner,
                repo: eventRepo,
                number: eventIssueNumber,
                labels: ['Incomplete Tasks']
            }).then(({ data, headers, status }) => {
                // handle data
            })
        } else {
            //remove label 
            octokit.issues.addLabels({
                owner: eventOwner,
                repo: eventRepo,
                number: eventIssueNumber,
                labels: 'Incomplete Tasks'
            }).then(({ data, headers, status }) => {
                // handle data
            })
        }
    }

    if (eventAction === 'closed') {
        console.log("running checklist check")

        var regex1 = RegExp('-\[ \]');

        let incompleteChecklist = regex1.test(eventIssueBody)

        if (incompleteChecklist) {
        
            //reopen the issue
            octokit.issues.edit({
                owner: eventOwner,
                repo: eventRepo,
                number: eventIssueNumber,
                state: 'open'
            }).then(({ data, headers, status }) => {
                // handle data
            })

            //add a comment 
            octokit.issues.createComment({
                owner: eventOwner,
                repo: eventRepo,
                number: eventIssueNumber,
                body: "There is one or more incomplete checklist items on this issue.  Please complete or remove the incomplete checklist items.  Reopening the issue."
            }).then(({ data, headers, status }) => {
                // handle data
            })
        } else {
            //remove label 
            octokit.issues.addLabels({
                owner: eventOwner,
                repo: eventRepo,
                number: eventIssueNumber,
                labels: 'Incomplete Tasks'
            }).then(({ data, headers, status }) => {
                // handle data
            })
        }
    }
}

//run the function
checklistChecker()