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
  
async function commitChecker() {

    //read contents of action's event.json
    const eventData = await helpers.readFilePromise('..' + process.env.GITHUB_EVENT_PATH)
    const eventJSON = JSON.parse(eventData) 
   
    //check if branch name starts with an issue number
    const branchIssueNumber = helpers.getIssueFromBranch(eventJSON.ref)

    if(branchIssueNumber) {
        //for each commit, check commit message for comment
        eventJSON.commits.forEach( commit => {

            const commitComment = helpers.checkForCommitActions(commit.message)

             //if comment in commit message, add comment to related issue
            if(commitComment) {
                const comment = `${commitComment} *from @${commit.author.username} in [${commit.id.substring(0,6)}](${commit.url})*` 

                helpers.addComment(octokit, eventOwner, eventRepo, branchIssueNumber, comment)
            }
        })    
    }
}

//run the function
commitChecker()

module.exports.commitChecker = commitChecker