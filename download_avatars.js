var request = require('request');
var secrets = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');
// console.log(secrets);
//how do i retrieve the token in the object, take what's in the key
// console.log(secrets.GITHUB_TOKEN);

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN,
    }
  };

  console.log(repoOwner)

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}


  getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


