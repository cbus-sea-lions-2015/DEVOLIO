class App.Views.Users.Show extends App.View
  template: JST['application/templates/users/show']

  render: ->
    console.log(@model)
    # model {user_settings{}, user_github{}, user_tweets{}}
    if @model.attributes.user_settings.interests
      intList = @model.attributes.user_settings.interests.split(",")
      @model.attributes.user_settings.interests = intList
    else
      @model.attributes.user_settings.interests = ""
    if @model.attributes.user_settings.skills
      skillsList = @model.attributes.user_settings.skills.split(",")
      @model.attributes.user_settings.skills = skillsList
    else
      @model.attributes.user_settings.skills = ""
    @$el.html(@template(@model.attributes))
