(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(files) {
    var cache, module, req;
    cache = {};
    req = function(id) {
      var file;
      if (cache[id] == null) {
        if (files[id] == null) {
          if ((typeof require !== "undefined" && require !== null)) {
            return require(id);
          }
          console.error("Cannot find module '" + id + "'");
          return null;
        }
        file = cache[id] = {
          exports: {}
        };
        files[id][1].call(file.exports, (function(name) {
          var realId;
          realId = files[id][0][name];
          return req(realId != null ? realId : name);
        }), file, file.exports);
      }
      return cache[id].exports;
    };
    if (typeof module === 'undefined') {
      module = {};
    }
    return module.exports = req(0);
  })([
    [
      {
        /*
          /Volumes/Home/Projects/Subtle/source/test.coffee
        */

        './canvas': 1
      }, function(require, module, exports) {
        var Canvas;
        Canvas = require('./canvas');
        return document.addEventListener('DOMContentLoaded', function() {
          var canvas, image;
          canvas = new Canvas(document.getElementById('wallpaper'));
          image = new Image();
          image.onload = function() {
            return canvas.tileImage(image);
          };
          return image.src = 'tile.png';
        });
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/Subtle/source/canvas.coffee
        */

      }, function(require, module, exports) {
        var Canvas;
        Canvas = (function() {
          function Canvas(el) {
            this.el = el;
            this.scaleImage = __bind(this.scaleImage, this);
            this.tileImage = __bind(this.tileImage, this);
            this.ctx = this.el.getContext('2d');
          }

          /**
           * Tile an image across the canvas
           - image (Image) : The image to tile
           > void
          */


          Canvas.prototype.tileImage = function(image) {
            var pattern;
            pattern = this.ctx.createPattern(image, 'repeat');
            this.ctx.fillStyle = pattern;
            return this.ctx.fillRect(0, 0, this.el.width, this.el.height);
          };

          /**
           * Resize and crop an image to fit a specific size
           * - image (Image) : An Image object
           * - dest (Object) : Contains the destination width and height
           * > array : the arguments for drawImage
          */


          Canvas.prototype.scaleImage = function(image, dest) {
            var args, padding, ratio, shrunk, source, _ref;
            args = [image, null, null, null, null, 0, 0, dest.width, dest.height];
            source = {
              width: image.width,
              height: image.height
            };
            ratio = {
              width: source.width / dest.width,
              height: source.height / dest.height
            };
            ratio.min = Math.min(ratio.width, ratio.height);
            shrunk = {
              width: source.width / ratio.min,
              height: source.height / ratio.min
            };
            padding = {
              width: ((shrunk.width - dest.width) / 2) * ratio.min,
              height: ((shrunk.height - dest.height) / 2) * ratio.min
            };
            args[1] = Math.round(padding.width);
            args[2] = Math.round(padding.height);
            args[3] = Math.round(dest.width * ratio.min);
            args[4] = Math.round(dest.height * ratio.min);
            return (_ref = this.ctx).drawImage.apply(_ref, args);
          };

          return Canvas;

        })();
        return module.exports = Canvas;
      }
    ]
  ]);

}).call(this);
