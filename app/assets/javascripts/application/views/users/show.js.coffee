class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  render: ->
    if @model.attributes.user_settings.interests
      intList = @model.attributes.user_settings.interests.split(",").map (interest) ->
        interest.trim()
      @model.attributes.user_settings.interests = intList
    else
      @model.attributes.user_settings.interests = ""
    @$el.html(@template(@model.attributes))
