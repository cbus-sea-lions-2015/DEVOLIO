#= require_self

#= require_tree ./templates

#= require ./mixins/base/mixin
#= require_tree ./mixins/base
#= require_tree ./mixins

#= require ./models/base/model
#= require_tree ./models/base
#= require_tree ./models

#= require ./collections/base/collection
#= require_tree ./collections/base
#= require_tree ./collections

#= require      ./routers/base/router
#= require_tree ./routers/base
#= require_tree ./routers

#= require      ./views/base/view
#= require_tree ./views/base
#= require_tree ./views

@App =
  Cache: {}
  Mixins: {}
  Helpers: {}
  Models: {}
  Collections: {}
  Routers: {}
  Views:
    Users: {}

_.extend App, Backbone.Events

$ ->
  App.router = new App.Routers.Users()
  Backbone.history.start pushState: true
