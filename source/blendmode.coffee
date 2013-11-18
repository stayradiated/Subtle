
Base = require 'base'
event = require './event'

class BlendMode extends Base.View

  events:
    'change': 'change'

  constructor: ->
    super

    @bind $ '#input-select-blendmode'

  change: (e) =>
    event.trigger 'change:blendmode', @el.val()


module.exports = BlendMode