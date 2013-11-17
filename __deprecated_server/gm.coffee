
gm = require 'gm'

gm::texturify = (width, height, type, pattern, negate = false) ->
  @_subCommand = ['composite', '-compose', type]
  @_in = []
  @_out = ['-size', "#{ width }x#{ height }", "tile:#{ pattern }"]
  if negate
    @_out.push '-negate'
  return this

module.exports = (opts, fn) ->
  throw new Error('invalid type') unless opts.type in ['Multiply', 'Divide']
  gm(opts.image)
    .resize(opts.width)
    .gravity('Center')
    .crop(opts.width, opts.height)
    .stream 'png', (err, stdout, stderr) ->
      gm(stdout, 'img.png')
        .texturify(opts.width, opts.height, opts.type, opts.pattern, opts.invert)
        .stream('png', fn)

# HOW TO USE
# ----------
# gm = require './gm'
#
# options =
#   width: 1920
#   height: 1080
#   type: 'Multiply'
#   image: 'in.png'
#   pattern: 'pattern.png'
#   invert: false
#
# gm options, (err, stdout, stderr) ->
#   stdout.pipe(response)
