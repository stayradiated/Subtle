
Canvas = require './canvas'

document.addEventListener 'DOMContentLoaded', ->

  canvas = new Canvas document.getElementById('wallpaper')
  image = new Image()

  image.onload = ->
    # canvas.scaleImage image,
    #   width: 1920
    #   height: 1080
    canvas.tileImage image

  image.src = 'tile.png'
