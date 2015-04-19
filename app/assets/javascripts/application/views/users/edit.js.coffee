class App.Views.Users.Edit extends App.View
  template: JST['application/templates/users/edit']

  render: ->
    @$el.html(@template(@model.attributes))
