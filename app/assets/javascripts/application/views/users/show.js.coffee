class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  render: ->
    # console.log(@model)
    # console.log("Attrs:",@model.attributes)
    @$el.html(@template(@model.attributes))
