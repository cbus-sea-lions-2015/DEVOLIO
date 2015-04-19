DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.CreateView extends Backbone.View
  template: JST["backbone/templates/users/create"]

  render: ->
    @$el.html(@template())
    return this
