ShowView = Backbone.View.extend({
  template: JST["backbone/templates/users/show"],
  initialize: function(){
    console.log("Show me your user showview!");
    console.log(this.$el)
  },
  render: function(){
    this.$el.html(this.template());
  }
})