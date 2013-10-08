
# Q  = require 'q'
gm = require 'gm'

gm::texturify = (width, height, type, pattern) ->
  @_subCommand = ['composite', '-compose', type]
  @_in = []
  @_out = ['-size', "#{ width }x#{ height }", "tile:#{pattern}"]
  return this

module.exports = (opts) ->
  # deferred = Q.defer()
  gm(opts.image)
    .resize(opts.width)
    .crop(opts.width, opts.height)
    .write opts.out, (err) ->
      gm(opts.out)
        .texturify(opts.width, opts.height, 'Multiply', opts.pattern)
        .write opts.out, (err) ->
          console.log('finished')
  # return deferred.promise

module.exports
  width: 1920
  height: 1080
  image: 'tetris.png'
  pattern: 'pattern.png'
  out: 'out.png'
