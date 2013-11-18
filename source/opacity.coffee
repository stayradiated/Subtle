
event = require './event'
Base = require 'base'

console.log event

class Opacity extends Base.View

  events:
    'change': 'change'

  constructor: ->
    super

    @bind $ '#input-range-opacity'

  change: (e) =>
    event.trigger 'change:opacity', @el.val() / 100

module.exports = Opacity

