
class ImageFile

  constructor: (@el) ->
    @el.addEventListener 'change', @read
    @reader = new FileReader()

    @reader.onload = (event) =>
      image = new Image()
      image.onload = =>
        @onload(image)
      image.src = @reader.result
      return image

  onload: =>
    throw new Error 'ImageFile.onload method has not been overridden'

  read: =>
    for file in @el.files
      @reader.readAsDataURL file


module.exports = ImageFile
