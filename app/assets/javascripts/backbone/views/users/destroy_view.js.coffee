DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.DestroyView extends Backbone.View
  template: JST["backbone/templates/users/destroy"]

  render: ->
    @$el.html(@template())
    return this
