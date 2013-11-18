
Base = require 'base'

class Download extends Base.View

  events:
    'click': 'download'

  constructor: ->
    super

    console.log this

    @bind $ '#output-download'

  download: =>
    win = window.open 'download.html'
    win.addEventListener 'load', =>
      win.postMessage @canvas.export(), '*'

module.exports = Download
