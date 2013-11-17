express = require 'express'
{EventEmitter} = require 'events'

class Server extends EventEmitter

  router_POST:
    '/upload': 'upload'

  router_GET:
    '/*': 'notFound'

  constructor: (@port) ->

    # Create server
    @server = express()

    # Configure server
    @server.use express.static './app'
    @server.use express.bodyParser()

    # Handle urls
    for path, method of @router_POST
      @server.post path, @[method]
    for path, method of @router_GET
      @server.get path, @[method]

    # Start server
    @server.listen @port

  upload: (req, res) =>

    if req.files.desktop.size is 0 or req.files.pattern.size is 0
      res.send('we need both files to work with')
      return

    @emit 'upload', req, res

  notFound: (req, res) =>
    res.status(404).sendfile('./app/404.html')

module.exports = Server
