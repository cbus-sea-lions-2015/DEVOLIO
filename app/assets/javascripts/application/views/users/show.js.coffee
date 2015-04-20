class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  render: ->
    console.log(@model)
    # model {user_settings{}, user_github{}, user_tweets{}}
    intList = @model.attributes.user_settings.interests.split(",")
    skillsList = @model.attributes.user_settings.skills.split(",")
    @model.attributes.user_settings.interests = intList
    @model.attributes.user_settings.skills = skillsList
    @$el.html(@template(@model.attributes))
