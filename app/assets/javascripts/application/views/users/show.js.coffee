class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  render: ->
    console.log(@model)
    console.log(@model.tweets)
    # console.log("Attrs:",@model.attributes)
    intList = @model.attributes.interests.split(",")
    skillsList = @model.attributes.skills.split(",")
    @model.attributes.interests = intList
    @model.attributes.skills = skillsList
    @$el.html(@template(@model.attributes))
