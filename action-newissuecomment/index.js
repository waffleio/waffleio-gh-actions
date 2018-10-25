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
  
async function commentOnNewIssue() {

    //read contents of action's event.json
    eventData = await readFilePromise('../github/workflow/event.json')
    eventJSON = JSON.parse(eventData) 

    //set eventAction and eventIssueNumber
    eventAction = eventJSON.action
    eventIssueNumber = eventJSON.issue.number

    console.log('event action: ' + eventAction)

    //if a new issue was opened 
    if (eventAction === 'opened') {
        console.log("creating welcome comment on issue")

        //add a comment to the new issue
        octokit.issues.createComment({
          owner: eventOwner,
          repo: eventRepo,
          number: eventIssueNumber,
          body: "🎉 Thanks for opening a new issue!  This community is successful because of it's contributors!  To help make sure your issue gets the attention it deserves, check out our [Contributing Guidelines](../blob/master/CONTRIBUTING.md)."
        }).then(({ data, headers, status }) => {
          // handle data
        })
    }

}

//run the function
commentOnNewIssue()