
class Canvas

  constructor: (@el) ->
    @ctx = @el.getContext '2d'

  ###*
   * Tile an image across the canvas
   - image (Image) : The image to tile
   > void
  ###

  tileImage: (image) =>
    pattern = @ctx.createPattern image, 'repeat'
    @ctx.fillStyle = pattern
    @ctx.fillRect 0, 0, @el.width, @el.height


  ###*
   * Resize and crop an image to fit a specific size
   * - image (Image) : An Image object
   * - dest (Object) : Contains the destination width and height
   * > array : the arguments for drawImage
  ###

  scaleImage: (image, dest) =>

    # Arguments for context.drawImage()
    args = [
      image,
      null, null, null, null,
      0, 0, dest.width, dest.height
    ]

    # The original dimensions of the image
    source =
      width:  image.width,
      height: image.height

    # Resizing ratio
    ratio =
      width:  source.width  / dest.width,
      height: source.height / dest.height

    ratio.min = Math.min ratio.width, ratio.height

    # Resized proportions
    shrunk =
      width:  source.width  / ratio.min,
      height: source.height / ratio.min

    # Padding to crop off the image
    padding =
      width:  ((shrunk.width  - dest.width)  / 2) * ratio.min,
      height: ((shrunk.height - dest.height) / 2) * ratio.min

    args[1] = Math.round padding.width
    args[2] = Math.round padding.height
    args[3] = Math.round dest.width  * ratio.min
    args[4] = Math.round dest.height * ratio.min

    @ctx.drawImage(args...)

module.exports = Canvas