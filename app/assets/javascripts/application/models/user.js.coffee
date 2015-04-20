class App.Models.User extends App.Model
  urlRoot: 'users',
  defaults:
    user_settings: {
      avatar: 'http://i.imgur.com/i31E9hh.jpg',
      username: '',
      website: '',
      email: '',
      interests: '',
      name: '',
      skills: '',
      twitter_handle: '',
      github_handle: ''
      description: ''
    },
    user_github: {

    },
    user_tweets: {
    
    }