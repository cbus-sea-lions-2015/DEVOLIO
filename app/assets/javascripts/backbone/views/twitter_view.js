var TwitterView = Backbone.View.extend({

  template: JST["templates/twitter"],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.setElement(this.template(this.model));
  }
});