var ResumeView = Backbone.View.extend({

  template: JST["templates/resume"],

  initialize: function() {
    this.listenTo(this.model, 'reset', this.buildResume);
    this.container = $(".main-container");
  },

  buildResume: function() {
    var twitter = new Twitter(),
        github = new Github();
    var twitterview = new TwitterView({model: twitter}),
        githubview = new GithubView({model: github});
    twitterview.render();
    githubview.render();
    this.$el.find(".dark-container").append(githubview.el);
    this.$el.find(".tweet-column").append(twitterview.el);
    return this;
  },

  render: function() {
    this.setElement(this.template(this.model));
    this.container.append(this.$el);
    // this.buildResume();
    return this;
  }
});