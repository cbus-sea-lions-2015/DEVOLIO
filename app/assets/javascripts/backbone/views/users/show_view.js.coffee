DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.ShowView extends Backbone.View
  template: JST["backbone/templates/users/show"]

  render: ->
    @$el.html(@template())
    return this
