class App.Models.User extends App.Model
  urlRoot: 'users'
  defaults:
    user_settings: {
        avatar: 'super_mario.jpg',
        username: '',
        blog_link: '',
        email: '',
        interests: '',
        name: '',
        skills: '',
        twitter_handle: '',
        github_handle: ''
        description: ''
        },
    user_github: {}