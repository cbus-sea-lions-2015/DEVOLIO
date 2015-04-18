var Resume = Backbone.Model.extend({
  url: '/:username',

  initialize: function(gh,tw) {
    this.github_handle = gh;
    this.twitter_handle = tw;
  }

});