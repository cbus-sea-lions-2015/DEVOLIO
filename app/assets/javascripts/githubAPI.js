var getGitHubData = function(username){
  var githubResults = {},
      api_uri = 'https://api.github.com/users/';

  // First API call: user
  requestJSON(api_uri + username, function(userdata) {
    // Second call: user repos
    requestJSON(api_uri + username + '/repos', function(repodata) {
      userdata["repos"] = repodata
      requestUserActivity();
      extractBasicResults(userdata);
    });
  });

  function requestUserActivity(){
    // Third call: Activity page 1
    requestJSON(api_uri + username + '/events?page=1', function(page1Data) {
      // Fourth call: Activity page 2
      requestJSON(api_uri + username + '/events?page=2', function(page2Data) {
        // Fifth call: Activity page 3
        requestJSON(api_uri + username + '/events?page=3', function(page3Data) {
          extractActivityResults(page1Data.concat(page2Data,page3Data));
          saveGithubResults(githubResults);
        });
      });
    });
  }

  function requestJSON(url, callback) {
    var request = $.getJSON(url, {
      format: "json",
    }).error(function(error) {
      $('.message').html("<h2>"+ error +"</h2>");
    }).done(function(data) {
      callback.call(null, data);
    });
    return request;
  }

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
    var repos = data.repos;
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
    reposData.allStars = allStars;
    console.log(reposData)
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

    githubResults.pushEvents = pushEvents;
    githubResults.pullEvents = pullEvents;
    githubResults.gistEvents = gistEvents;
    githubResults.forkEvents = forkEvents;
    githubResults.eventDates = eventDates;
    githubResults.mostRecentEventDate = mostRecentEventDate;
    githubResults.oldestEventDate = oldestEventDate;
    githubResults.commits = commits;
    githubResults.lineAdditions = additions;
    githubResults.lineDeletions = deletions;
    githubResults.commitMessages = commitMessages;
    githubResults.languages = languages;
  }

  function saveGithubResults(githubResults) {
    $.ajax({
      url: '/store_github',
      type: 'POST',
      data: {github_profile: githubResults}
    }).done(function(data){
      $('.message').html("<h2>GitHub save success!</h2>");
    }).error(function(error) {
      $('.message').html("<h2>"+ error +"</h2>");
    });
  }
}

window.getGitHubData = getGitHubData;