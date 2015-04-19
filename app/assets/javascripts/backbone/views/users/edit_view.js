EditView = Backbone.View.extend({
  template: JST["backbone/templates/users/edit"],
  initialize: function(){
    console.log("Show me your user editview!");
    console.log(this.$el)
  },
  render: function(){
    this.$el.html(this.template());
  }
})