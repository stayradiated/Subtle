
ImageFile = require './imagefile'
Canvas = require './canvas'

document.addEventListener 'DOMContentLoaded', ->

  canvas = new Canvas document.getElementById('wallpaper')

  fileInput =
    desktop: new ImageFile document.getElementById 'input-file-desktop'
    pattern: new ImageFile document.getElementById 'input-file-pattern'

  fileInput.desktop.onload = (image) ->
    canvas.scaleImage image,
      width: 1920
      height: 1080

  fileInput.pattern.onload = (image) ->
    canvas.tileImage image

