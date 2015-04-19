DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.UpdateView extends Backbone.View
  template: JST["backbone/templates/users/update"]

  render: ->
    @$el.html(@template())
    return this
