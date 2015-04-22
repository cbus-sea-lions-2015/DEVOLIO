class App.Routers.Users extends App.Router

  routes:
    "dashboard" : "edit"
    ":username" : "show"

  show: (username)->
    user = new App.Models.User id: username
    user.fetch().done ->
      view = new App.Views.Users.Show(model: user)
      $('.main-container').html(view.el)
      view.render()
      displayLanguages(user.attributes.user_github.reposData.allLang, '#js-recentLanguages')
      displayLanguages(user.attributes.user_github.languages, '#js-allLanguages')
      parseHistogram(user.attributes.user_github.eventDates)


  edit: ->
    username = $('body').attr('id');
    user = new App.Models.User id: username
    emailHistory = new App.Models.EmailHistory id: username
    user.fetch().done ->
      emailHistory.fetch().done ->
        console.log(emailHistory)
        view = new App.Views.Users.Edit(model: user, emailHistory: emailHistory)
        $('.main-container').html(view.el)
        view.render()
