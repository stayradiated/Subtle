
(function () {

  var canvas = document.getElementById('wallaper');
  var ctx = canvas.getContext('2d');
  var image = new Image();

  image.onload = function () {
    ctx.drawImage(image, 0, 0, 100, 100);
  };

  image.src = 'test.jpg';

}());

