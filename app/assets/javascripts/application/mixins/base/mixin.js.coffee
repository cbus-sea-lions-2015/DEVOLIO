App.Mixin =

  extend: (mixin) ->
    for key, value of mixin when key not in ['extend','include']
      @[key] = value
    mixin.extended?.apply(@)
    return @

  include: (mixin) ->
    for key, value of mixin when key not in ['extend','include']
      @::[key] = value
    mixin.included?.apply(@)
    return @
