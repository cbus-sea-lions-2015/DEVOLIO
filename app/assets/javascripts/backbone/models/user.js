var User = Backbone.Model.extend({
  urlRoot: '/users'
  defaults: {

  },

  initialize: function() {
    console.log("Created a new user model");
  },

  // Example user creation
  // var user = new UserModel();
  // var userDetails = {
  //     name: 'Thomas',
  //     email: 'thomasalwyndavis@gmail.com'
  // };
  // user.save(userDetails, {success:function()})

  // Example user retrieval
  // var user = new Usermodel({id: 1});
  // user.fetch({
  //     success: function (user) {
  //         alert(user.toJSON());
  //     }
  // })

  // Example user update
  // Identify which ID the user is
  // var user = new Usermodel({id: 1});
  // Because there is `id` present, Backbone.js will fire
  // PUT /user/1 with a payload of user attributes
  // user.save({name: 'Davis'}, {
  //     success: function (model) {
  //         alert(user.toJSON());
  //     }
  // });

  // Example user destroy
  // var user = new Usermodel({id: 1});
  // user.destroy({
  //     success: function () {
  //         alert('Destroyed');
  //     }
  // });

});