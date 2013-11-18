
$ = require 'jqueryify'
ImageFile = require './imagefile'
Canvas = require './canvas'
patterns = require './patterns'
screen = require './screen'
Opacity = require './opacity'
BlendMode = require './blendmode'
Download = require './download'

document.addEventListener 'DOMContentLoaded', ->

  new Opacity
  new BlendMode

  canvas = new Canvas document.getElementById('wallpaper')

  new Download
    canvas: canvas

  fileInput =
    desktop: new ImageFile document.getElementById 'input-file-desktop'
    pattern: new ImageFile document.getElementById 'input-file-pattern'

  currentImage = null

  canvas.setSize screen

  fileInput.desktop.onload = (image) ->
    canvas.image = image
    canvas.redraw()

  fileInput.pattern.onload = (image) ->
    canvas.pattern = image
    canvas.redraw()

  patternHolder = document.querySelector '.patterns'

  for filename in patterns
    path = "subtlepatterns/#{ filename }"

    div = document.createElement 'div'
    div.className = 'pattern'
    div.style.backgroundImage = "url(#{ path })"
    div.image = new Image()
    div.image.src = path

    patternHolder.appendChild div

  patternHolder.addEventListener 'click', (event) ->
    target = event.target
    return unless target.className is 'pattern'
    canvas.pattern = target.image
    canvas.redraw()



