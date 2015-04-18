var Twitter = Backbone.Model.extend({
  url: '/resume/tweets',

  defaults: {
    handle: ''
  }
});
