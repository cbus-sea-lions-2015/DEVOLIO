var getGitHubData = function(username){
  var githubResults = {},
      api_uri = 'https://api.github.com/users/';

  // var test;
  requestJSON(user_uri, function(json){
    if(json.message == "Not Found" || username == '') {
      $('.message').html("<h2>No User Info Found</h2>");
    }
    else {
      // else we have a user and we display their info
      githubResults.github_handle = json.login;
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

  function extractBasicResults(data) {
    githubResults.github_handle = data.login;
    githubResults.fullName = data.name || githubResults.username;
    githubResults.aviurl = data.avatar_url;
    githubResults.profileurl = data.html_url;
    githubResults.location = data.location;
    githubResults.followersnum = data.followers;
    githubResults.followingnum = data.following;
    githubResults.reposnum = data.public_repos;
    githubResults.reposData = extractReposData(data);
  }

  function extractReposData(data) {
    var repos = data;
    var allStars = 0,
        allLang = {},
        reposData = {}
    for (var i = 0; i < repos.length; i++) {
      allStars += repos[i].stargazers_count;
      var rlanguage = repos[i].language;
      if (rlanguage in allLang) {
        allLang[rlanguage]++;
      }
      else {
        allLang[rlanguage] = 1;
      }
    }
    reposData.allLang = allLang;
    reposData.allStars = allStars
    return reposData
  }

  function extractActivityResults(data) {
    var events = data;
    var commitMessages = [],
        pushEvents = 0,
        languages = {},
        pullEvents = 0,
        commits = 0,
        additions = 0,
        deletions = 0,
        gistEvents = 0,
        forkEvents = 0,
        mostRecentEventDate,
        oldestEventDate,
        eventDates = [];
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

function requestJSON(url, callback) {
  var otherTest = $.getJSON(url, {
    format: "json",
  }).error(function(error) {
    $('.message').html("<h2>"+ error +"</h2>");
  }).done(function(data) {
    callback.call(null, data);
  });
return otherTest;
}

function saveGithubResults(githubResults) {
  $.ajax({
    url: '/store_github',
    type: 'POST',
    data: {github_profile: githubResults}
  }).done(function(data){
  })
}