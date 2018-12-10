const fs = require("fs");

module.exports.readFilePromise = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }).catch(err => {
    console.log(err);
  });
};

module.exports.getOwner = function(eventOwnerAndRepo) {
  const slicePos1 = eventOwnerAndRepo.indexOf("/");
  return eventOwnerAndRepo.slice(0, slicePos1);
};

module.exports.getRepo = function(eventOwnerAndRepo) {
  const slicePos1 = eventOwnerAndRepo.indexOf("/");
  return eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length);
};

module.exports.getBulkLabels = function(eventIssueBody) {
  const regex = RegExp(/\[(.*){3}\]/);
  const matches = regex.exec(eventIssueBody);
  if (matches) {
    return matches[0].slice(1, matches[0].length - 1).split(", ");
  } else {
    return matches;
  }
};

module.exports.addLabel = function(
  octokit,
  eventOwner,
  eventRepo,
  eventIssueNumber,
  label
) {
  octokit.issues
    .addLabels({
      owner: eventOwner,
      repo: eventRepo,
      number: eventIssueNumber,
      labels: [label] // ['Incomplete Tasks']
    })
    .then(({ data, headers, status }) => {
      // handle data
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getRepoLabels = async function(octokit, eventOwner, eventRepo) {
  return octokit.issues
    .listLabelsForRepo({
      owner: eventOwner,
      repo: eventRepo
    })
    .then(({ data, headers, status }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getShortLabelName = async function(label) {
  label.shortName = label.name.slice(0, 3);
  return label;
};
