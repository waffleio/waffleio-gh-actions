const fs = require('fs')

module.exports.readFilePromise = function(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports.getOwner = function(eventOwnerAndRepo) {
    const slicePos1 = eventOwnerAndRepo.indexOf("/")
    return eventOwnerAndRepo.slice(0, slicePos1)
}

module.exports.getRepo = function(eventOwnerAndRepo) {
    const slicePos1 = eventOwnerAndRepo.indexOf("/")
    return eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length)
}

module.exports.getIssueFromBranch = function(pushRef) {      
    let regex1 = /refs\/heads\/(\d+)/i
    let found = pushRef.match(regex1)

    if(found) {
        return found[1]
        console.log('function: ' + found)
    } else {
        return false
    }
}

module.exports.checkForCommitActions = function(commitMessage) {      
    let regex1 = /#comment (.*)/i
    let found = commitMessage.match(regex1)

    if(found) {
        return found[1]
    } else {
        return false
    }
}

module.exports.addComment = function(octokit, eventOwner, eventRepo, branchIssueNumber, comment) {
    octokit.issues.createComment({
        owner: eventOwner,
        repo: eventRepo,
        number: branchIssueNumber,
        body: comment
    }).then(({ data, headers, status }) => {
        // handle data
    }).catch(err => {
        console.log(err)
    })
}
