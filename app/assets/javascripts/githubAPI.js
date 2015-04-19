$(document).ready(function() {

  $('#get_api').on('click', function(e){
    e.preventDefault();
    var username = $('#gh_username').val();    
    getGitHubData(username);
    debugger;
  });


  
});

var getGitHubData = function(username){
  var githubResults = {test: "test"}
  var user_uri   = 'https://api.github.com/users/'+username;
  var events_uri = 'https://api.github.com/users/'+username+'/events';

  var test;
  requestJSON(user_uri, function(json){
    if(json.message != "Not Found" && username != '') {
      $('.message').html("<h2>No User Info Found</h2>");
    }
    else {
      // else we have a user and we display their info
      githubResults.username = json.login;
      githubResults.fullName = json.name || githubResults.username;
      githubResults.aviurl = json.avatar_url;
      githubResults.profileurl = json.html_url;
      githubResults.location = json.location;
      githubResults.followersnum = json.followers;
      githubResults.followingnum = json.following;
      githubResults.reposnum = json.public_repos;

      var events;
      var pushEvents = 0;
      var pullEvents = 0;
      var gistEvents = 0;
      var forkEvents = 0;
      var mostRecentEventDate;
      var oldestEventDate;
      var eventDates = [];
      var languages = {};
      var commits = 0;
      var additions = 0;
      var deletions = 0;
      var commitMessages = [];
      
      $.getJSON(events_uri, function(json){
        console.log("Checking inside JSON")
        console.log(githubResults);
        events = json;
        for (var i = 0; i < events.length; i++) {
          if (events[i].type === "PushEvent") {
            var commitsCollection = events[i].payload.commits
            for (var j = 0; j < commitsCollection.length; j++){
              commitMessages.push({message: commitsCollection[j].message, url: events[i].repo.url});
            }
            pushEvents += 1;
          }
          else if (events[i].type === "PullRequestEvent") {
            var language = events[i].payload.pull_request.head.repo.language;
            if (language in languages) {
              languages[language]++;
            }
            else {
              languages[language] = 1;
            }
            pullEvents += 1;
            commits += events[i].payload.pull_request.commits;
            additions += events[i].payload.pull_request.additions;
            deletions += events[i].payload.pull_request.deletions;
          }
          else if (events[i].type === "GistEvent") {
            gistEvents++;
          }
          else if (events[i].type === "ForkEvent") {
            forkEvents++;
          }
          eventDates.push({date: events[i].created_at, eventType: events[i].type});
        }
        mostRecentEventDate = events[0].created_at;
        oldestEventDate = events[events.length-1].created_at;

        githubResults.pushEvents = pushEvents;
        githubResults.pullEvents = pullEvents;
        githubResults.gistEvents = gistEvents;
        githubResults.forkEvents = forkEvents;
        githubResults.mostRecentEventDate = mostRecentEventDate;
        githubResults.oldestEventDate = oldestEventDate;
        githubResults.commits = commits;
        githubResults.lineAdditions = additions;
        githubResults.lineDeletions = deletions;
        githubResults.commitMessages = commitMessages; 
        githubResults.languages = languages;
        console.log(githubResults);
        saveGithubResults(githubResults);
      })
    } // end else statement
  }); // end requestJSON Ajax call
}; // end click event handler

function requestJSON(url, callback) {
  var otherTest = $.getJSON(url, {
    format: "json",
  }).error(function(error) {
    $('.message').html("<h2>"+ error +"</h2>");
  }).done(function(data) {
    callback.call(null, data);
  });
  debugger;
return otherTest;
}

function saveGithubResults(githubResults) {
  console.log("inside save");
  console.log(githubResults);
  $.ajax({
    url: '/store_github',
    type: 'POST',
    data: githubResults
  }).done(function(data){
  })
}