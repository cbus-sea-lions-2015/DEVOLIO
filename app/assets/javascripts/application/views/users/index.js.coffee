class App.Views.Users.Index extends App.View
  template: JST['application/templates/users/index']

  parameters: ->
    @collection.map (model) ->
      notes: model.get('username')

  render: ->
    @$el.html(@template(@parameters()))