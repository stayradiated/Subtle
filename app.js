
(function () {

  var init, scaleImage;

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  init = function () {

    var canvas = document.getElementById('wallpaper');
    var ctx = canvas.getContext('2d');
    var image = new Image();

    image.onload = function () {
      var args = scaleImage(image, {width: 1920, height: 1080});
      console.log(args);
      ctx.drawImage.apply(ctx, args);
    };

    image.src = 'test.png';

  };

  /**
   * Resize and crop an Image to fit a specific size
   * - image (Image) : An Image object
   * - dest (Object) : Contains the destination width and height
   * > array : the arguments for drawImage
   */
  scaleImage = function(image, dest) {

    // Arguments for context.drawImage();
    var args = [
      image,
      null, null, null, null,
      0, 0, dest.width, dest.height
    ];

    // The original dimensions of the image
    var source = {
      width:  image.width,
      height: image.height
    };

    // Resizing ratio
    var ratio = {
      width:  source.width  / dest.width,
      height: source.height / dest.height
    };

    ratio.min = Math.min(ratio.width, ratio.height);

    // Resized proportions
    var shrunk = {
      width:  source.width  / ratio.min,
      height: source.height / ratio.min
    };

    // Padding to crop off the image
    var padding = {
      width:  ((shrunk.width  - dest.width)  / 2) * ratio.min,
      height: ((shrunk.height - dest.height) / 2) * ratio.min
    };

    /* sx */ args[1] = Math.round(padding.width);
    /* sy */ args[2] = Math.round(padding.height);
    /* sw */ args[3] = Math.round(dest.width  * ratio.min);
    /* sh */ args[4] = Math.round(dest.height * ratio.min);


    return args;


  };


}());

