
(function () {

  var init, scaleImage;

  document.addEventListener('DOMContentLoaded', function () {
    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    init();
  });

  init = function () {

    var canvas = document.getElementById('wallpaper');
    var ctx = canvas.getContext('2d');
    var image = new Image();

    image.onload = function () {
      scaleImage(image, {width: 1920, height: 1080});
      // ctx.drawImage(image, 0, 0, 1920, 1080);
    };

    image.src = 'test.jpg';

  };

  /**
   * Resize and crop an Image to fit a specific size
   * - image (Image) : An Image object
   * - size (Object) : Contains the destination width and height
   * > array : the arguments for drawImage
   */
  scaleImage = function(image, size) {

    // The original dimensions of the image
    var original = {
      width: image.width,
      height: image.height
    };

    var ratio = size.width / size.height;

    console.log(ratio);

  };

}());

