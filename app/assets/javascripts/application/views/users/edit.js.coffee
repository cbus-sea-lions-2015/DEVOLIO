class App.Views.Users.Edit extends App.View
  template: JST['application/templates/users/edit']

  events:
    'submit #user-form' : 'userFormSubmit'
    'submit #mailer-form' : 'mailerFormSubmit'
    'click .delete-skill' : 'deleteSkill'
    'click .delete-position' : 'deletePosition'

  render: ->
    @$el.html(@template(@model.attributes))

  userFormSubmit: ->
    $('#get_api').attr('disabled', true)
    $('#get_api').val('Loading...')
    form = @$el.find "#user-form"
    newAttrs = form.serializeJSON()
    success = =>
      console.log @model
      gh_handle = @model.get('github_handle')
      window.getGitHubData(gh_handle) if gh_handle
      App.router.navigate("/#{@model.get('username')}", {trigger: true});
    error = ->
      $('#get_api').attr('disabled', false)
      $('#get_api').val('Submit')
      $('.message').html("<span class='error'>There was an issue saving your updates</span>")
    @model.save(newAttrs, success: success, error: error)
    false

  mailerFormSubmit: (e) ->
    e.preventDefault()
    $('#send_email').attr('disabled', true)
    $('#send_email').val('Sending...')
    form = @$el.find "#mailer_form"
    username = $('body').attr('id')
    address = $('#send-email-address').val();
    window.sendEmail(address, username)
    error = ->
      $(form + ' .message').html("<span class='error'>There was an issue and no email was sent.</span>")
    success = ->
      

  deleteSkill: (e) ->
    e.preventDefault()
    skillNode = e.currentTarget.parentNode
    skillNode.remove()

  deletePosition: (e) ->
    e.preventDefault()
    positionNode = e.currentTarget.parentNode.parentNode
    positionNode.remove()
