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