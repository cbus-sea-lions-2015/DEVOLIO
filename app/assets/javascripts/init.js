
$(document).ready(function() {

  App = Backbone.Model.extend({
    url: "/"
  });

  $('#buildResume').on('click', function(e){
    e.preventDefault();

    var gh_handle = $('#gh_handle').val();

    callGithubApi(gh_handle);




    $.ajax({
      url: '/resume/twitter',
      data: username
    }).done(function(data){
      console.log(data)
    })

    // var resume = new Resume(gh_handle,tw_handle);
    // resume.fetch();
    // console.log(resume)
    // var resumeView = new ResumeView({model: resume});
    // resumeView.render();
  });

  // App.CurrentUserView = Backbone.View.extend({
  //   el: ".main-container",

  //   render: function(){
  //     this.$el.html( "<h1>" + this.model.url + "</h1>" );
  //   }
  // });

  // var currentUser = new App.CurrentUser();
  // currentUser.fetch();

  // var currentUserView = new App.CurrentUserView({ model: currentUser });
  // currentUserView.render();


});
