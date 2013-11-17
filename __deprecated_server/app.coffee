
Server = require './server'
gm = require './gm'

fs = require 'fs'

server = new Server(process.env.PORT or 5000)

server.on 'upload', (req, res) ->

  options =
    width: parseInt req.body.width, 10
    height: parseInt req.body.height, 10
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
