$(document).ready(function(){
  // Land on /:username
  // get user

  var AppRouter = Backbone.Router.extend({
      routes: {
        "dashboard": "editUser",
        ":username": "getUser"
        // "*actions": "defaultRoute" // Backbone will try to match the route above first
      }
  });
  // Instantiate the router
  var app_router = new AppRouter;
  app_router.on('route:getUser', function (username) {
      // Note the variable in the route definition being passed in here
      // alert( "Get post number " + username );
      // console.log(username);
      // var user = new User({username: username});
      // console.log(user);
      var view = new ShowView({ el: $('.main-container') });
      view.render();
  });
  app_router.on('route:editUser', function () {
      // Note the variable in the route definition being passed in here
      // alert( "Get post number " + username );
      var view = new EditView({ el: $('.main-container') });
      view.render();
  });
  app_router.on('route:defaultRoute', function (actions) {
      // alert( actions );
  });
  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();
});