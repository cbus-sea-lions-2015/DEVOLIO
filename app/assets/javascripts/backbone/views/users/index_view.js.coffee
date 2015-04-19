DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.IndexView extends Backbone.View
  template: JST["backbone/templates/users/index"]

  render: ->
    @$el.html(@template())
    return this
