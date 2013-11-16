
Server = require './server'
gm = require './gm'

fs = require 'fs'

server = new Server(9000)

server.on 'upload', (req, res) ->

  options =
    width: 1920
    height: 1080
    image: req.files.desktop.path
    pattern: req.files.pattern.path
    type: req.body.filter
    invert: req.body.invert

  res.set 'Content-Type', 'image/png'

  gm options, (err, stdout, sderr) ->
    if err
      console.log err
    else
      stdout.pipe res
