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

  request(options, function(err, res, body) {
    // console.log('info received')
    var parse = JSON.parse(body);
    var urls = '';
    for (let i = 0; i < parse.length; i++) {
      urls += parse[i];
      console.log(parse[i].avatar_url);
    }
    cb(err, parse);
  });
}

// function downloadImageByURL(url, filePath) {
//   // ...
// }


  getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});


