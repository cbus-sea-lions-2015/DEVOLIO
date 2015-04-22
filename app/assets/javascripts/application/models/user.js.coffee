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
      github_handle: '',
      twitter_handle: '',
      linkedin_handle: '',
      description: '',
      positions: ''
    },
    user_github: {},
    user_tweets: {}