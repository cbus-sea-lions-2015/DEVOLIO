function callGithubApi(gh_handle){
  var username = gh_handle;
    var user_uri   = 'https://api.github.com/users/'+username;
    var repo_uri  = 'https://api.github.com/users/'+username+'/repos';

    requestJSON(user_uri, function(json) {
      console.log("My json")
      console.log(json)
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }

      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;

        if(fullname == undefined) { fullname = username; }

        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';

        var repositories;
        $.getJSON(repo_uri, function(json){
          repositories = json;
          outputPageContent();
        });

        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
          }
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call

  function requestJSON(url, callback) {
    $.getJSON(url, {
      format: "json",
    }).error(function(error) {
      $('#ghapidata').html("<h2>"+ error +"</h2>");
    }).done(function(data) {
      console.log("my xhr")
      console.log(data)
      callback.call(null, data);
    });
  }
};
