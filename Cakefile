sass    = require 'node-sass'
Scrunch = require 'coffee-scrunch'
uglify  = require 'uglify-js'
server  = require 'node-static'
http    = require 'http'
fs      = require 'fs'

# Configuration
config =
  port: 9294
  public: 'app'
  js:
    input:  'source/test.coffee'
    output: 'app/app.js'
    min:    'app/app.min.js'
  css:
    input:  'source/stylesheets/screen.scss'
    output: 'app/screen.css'

# Options
option '-p', '--port [port]', 'Set port for cake server'
option '-w', '--watch', 'Watch the folder for changes'

compile =

  coffee: (options={}) ->

    scrunch = new Scrunch
      path: config.js.input
      compile: true
      verbose: true
      watch: options.watch

    scrunch.vent.on 'init', ->
      scrunch.scrunch()

    scrunch.vent.on 'scrunch', (data) ->
      console.log '[JS] Writing'
      fs.writeFile config.js.output, data

    scrunch.init()

  sass: (options={}) ->
    sass.render
      file: config.css.input
      success: (css) ->
        fs.writeFile config.css.output, css
        console.log '[SCSS] Done'
      error: ->
        console.log '[SCSS] [ERROR]', arguments

  minify: ->
    js = uglify.minify(config.js.output).code
    fs.writeFile config.js.min, js

# Tasks
task 'server', 'Start server', (options) ->

  # Compile files
  compile.coffee(options)
  # compile.sass(options)

  # Start Server
  port = options.port or config.port
  file= new(server.Server)(config.public)
  server = http.createServer (req, res) ->
    req.addListener( 'end', ->
      file.serve(req, res)
    ).resume()
  server.listen(port)

  console.log 'Server started on ' + port

task 'build', 'Compile CoffeeScript and SASS', (options) ->
  compile.coffee(options)
  # compile.sass(options)

task 'sass', 'Compile only SASS files', compile.sass
task 'coffee', 'Compile only coffee files', compile.coffee
task 'minify', 'Minify application.js', compile.minify

task 'open', 'Open the app in a browser', (options) ->
  {exec} = require 'child_process'
  port = options.port or config.port
  exec 'open http://localhost:' + port
