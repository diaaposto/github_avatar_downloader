var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

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

    for (let i = 0; i < parse.length; i++) {
      let parsedObj = parse[i];
      // console.log(parsedObj)
      let eachAddress = parse[i].avatar_url;
      let id = parse[i].login;
      downloadImageByURL(eachAddress, id);

    }

    cb(err, parse);
  });
}

function downloadImageByURL(url, id) {
  request.get(url)
  .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream("./avatars/" + id + ".jpg")); // cause you're just adding strings together
}



  getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});


