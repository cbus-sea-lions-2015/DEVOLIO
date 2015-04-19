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

  edit: ->
    username = $('body').attr('id');
    user = new App.Models.User id: "supermario"
    user.fetch().done ->
      view = new App.Views.Users.Edit(model: user)
      $('.main-container').html(view.el)
      view.render()