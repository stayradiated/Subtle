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
          /home/stayrad/Projects/subtledesktop/source/test.coffee
        */

        './imagefile': 1,
        './canvas': 2
      }, function(require, module, exports) {
        var Canvas, ImageFile;
        ImageFile = require('./imagefile');
        Canvas = require('./canvas');
        return document.addEventListener('DOMContentLoaded', function() {
          var canvas, fileInput;
          canvas = new Canvas(document.getElementById('wallpaper'));
          fileInput = {
            desktop: new ImageFile(document.getElementById('input-file-desktop')),
            pattern: new ImageFile(document.getElementById('input-file-pattern'))
          };
          fileInput.desktop.onload = function(image) {
            return canvas.scaleImage(image, {
              width: 1920,
              height: 1080
            });
          };
          return fileInput.pattern.onload = function(image) {
            return canvas.tileImage(image);
          };
        });
      }
    ], [
      {
        /*
          /home/stayrad/Projects/subtledesktop/source/imagefile.coffee
        */

      }, function(require, module, exports) {
        var ImageFile;
        ImageFile = (function() {
          function ImageFile(el) {
            var _this = this;
            this.el = el;
            this.read = __bind(this.read, this);
            this.onload = __bind(this.onload, this);
            this.el.addEventListener('change', this.read);
            this.reader = new FileReader();
            this.reader.onload = function(event) {
              var image;
              image = new Image();
              image.onload = function() {
                return _this.onload(image);
              };
              image.src = _this.reader.result;
              return image;
            };
          }

          ImageFile.prototype.onload = function() {
            throw new Error('ImageFile.onload method has not been overridden');
          };

          ImageFile.prototype.read = function() {
            var file, _i, _len, _ref, _results;
            _ref = this.el.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              file = _ref[_i];
              _results.push(this.reader.readAsDataURL(file));
            }
            return _results;
          };

          return ImageFile;

        })();
        return module.exports = ImageFile;
      }
    ], [
      {
        /*
          /home/stayrad/Projects/subtledesktop/source/canvas.coffee
        */

      }, function(require, module, exports) {
        var Canvas;
        Canvas = (function() {
          function Canvas(el) {
            this.el = el;
            this.scaleImage = __bind(this.scaleImage, this);
            this.tileImage = __bind(this.tileImage, this);
            this.setBlendMode = __bind(this.setBlendMode, this);
            this.setOpacity = __bind(this.setOpacity, this);
            this.ctx = this.el.getContext('2d');
          }

          Canvas.prototype.setOpacity = function(opacity) {
            if (opacity == null) {
              opacity = 1;
            }
            return this.ctx.globalAlpha = opacity;
          };

          Canvas.prototype.setBlendMode = function(blendmode) {
            if (blendmode == null) {
              blendmode = 'source-over';
            }
            return this.ctx.globalCompositeOperation = blendmode;
          };

          /**
           * Tile an image across the canvas
           - image (Image) : The image to tile
           > void
          */


          Canvas.prototype.tileImage = function(image) {
            var pattern;
            pattern = this.ctx.createPattern(image, 'repeat');
            this.setOpacity(0.5);
            this.setBlendMode('multiply');
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
            this.setBlendMode();
            this.setOpacity();
            return (_ref = this.ctx).drawImage.apply(_ref, args);
          };

          return Canvas;

        })();
        return module.exports = Canvas;
      }
    ]
  ]);

}).call(this);
