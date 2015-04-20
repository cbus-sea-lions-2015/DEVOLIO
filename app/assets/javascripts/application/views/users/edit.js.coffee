class App.Views.Users.Edit extends App.View
  template: JST['application/templates/users/edit']

  events:
    'submit #user_form' : 'userFormSubmit'
    'submit #mailer-form' : 'mailerFormSubmit'

  render: ->
    @$el.html(@template(@model.attributes))

  userFormSubmit: ->
    $('#get_api').attr('disabled', true)
    $('#get_api').val('Loading...')
    form = @$el.find "#user_form"
    newAttrs = @updateModelFromForm(form)
    success = =>
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
    $('#send_email').val('Loading...')
    form = @$el.find "#mailer_form"
    username = $('body').attr('id')
    console.log(username)
    address = $('#send-email-address').val();
    window.sendEmail(address, username)
    success = =>
      console.log("Mail successfully sent1")
    error = ->
      $(form + ' .message').html("<span class='error'>There was an issue and no email was sent.</span>")
    $('#send_email').attr('disabled', false)
    $('#send_email').val('Submit')

  updateModelFromForm: (form) =>
    unindexed_array = form.serializeArray()
    formData = {}
    $.map unindexed_array, (n, i) =>
      formData[n['name']] = n['value']
    formData
