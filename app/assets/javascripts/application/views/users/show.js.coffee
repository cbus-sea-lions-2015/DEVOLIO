class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  Array::reject = (deleteValue) ->
    i = 0
    while i < @length
      if @[i] == deleteValue
        @splice i, 1
        i--
      i++
    this

  render: ->
    if @model.attributes.user_settings.interests
      intList = @model.attributes.user_settings.interests.split(",").map (interest) ->
        interest.trim()
      intList = intList.reject('')
      @model.attributes.user_settings.interests = intList
    else
      @model.attributes.user_settings.interests = ""
    @$el.html(@template(@model.attributes))
