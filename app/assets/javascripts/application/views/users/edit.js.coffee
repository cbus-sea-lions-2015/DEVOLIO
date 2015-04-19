class App.Views.Users.Edit extends App.View
  template: JST['application/templates/users/edit']

  events:
    'submit form' : 'onFormSubmit'

  render: ->
    @$el.html(@template(@model.attributes))

  onFormSubmit: ->
    form = @$el.find "form"
    newAttrs = @updateModelFromForm(form)
    success = =>
      App.router.navigate("/#{@model.get('username')}", {trigger: true});
      # $('.message').html("<span class="">Saved</span>")
    error = -> $('.message').html("<span class='error'>There was an issue saving your updates</span>")
    @model.save(newAttrs, success: success, error: error)
    false

  updateModelFromForm: (form) =>
    unindexed_array = form.serializeArray()
    formData = {}
    $.map unindexed_array, (n, i) =>
      formData[n['name']] = n['value']
    formData

  