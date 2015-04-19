DEVOLIO.Views.Users ||= {}

class DEVOLIO.Views.Users.EditView extends Backbone.View
  template: JST["backbone/templates/users/edit"]

  render: ->
    @$el.html(@template())
    return this
