/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fillSection = e => {
	const hex = getFill()
	console.log(hex)
	const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	curColor.r = parseInt(rgb[1], 16)
	curColor.g = parseInt(rgb[2], 16)
	curColor.b = parseInt(rgb[3], 16)

	if (e.layerX || e.layerX == 0) {
		e._x = e.layerX;
		e._y = e.layerY;
	} else if (e.offsetX || e.offsetX == 0) {
		e._x = e.offsetX;
		e._y = e.offsetY;
	}
    var drawingBoundTop = 0;
    var imageData = context.getImageData(0, 0, w, h);
    pixelStack = [[e._x, e._y]];

    while (pixelStack.length) {
      var newPos, x, y, pixelPos, reachLeft, reachRight;
      newPos = pixelStack.pop();
      x = newPos[0];
      y = newPos[1];

      pixelPos = (y * w + x) * 4;
      while (y-- >= drawingBoundTop && matchStartColor(pixelPos)) {
        pixelPos -= w * 4;
      }
      pixelPos += w * 4;
      ++y;
      reachLeft = false;
      reachRight = false;
      while (y++ < h - 1 && matchStartColor(pixelPos)) {
        colorPixel(pixelPos);

        if (x > 0) {
          if (matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < w - 1) {
          if (matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += w * 4;
      }
    }
    context.putImageData(imageData, 0, 0);

    function matchStartColor(pixelPos) {
      var r = imageData.data[pixelPos];
      var g = imageData.data[pixelPos + 1];
      var b = imageData.data[pixelPos + 2];

      return r !== curColor.r || g !== curColor.g || b !== curColor.b;
    }

    function colorPixel(pixelPos) {
      imageData.data[pixelPos] = curColor.r;
      imageData.data[pixelPos + 1] = curColor.g;
      imageData.data[pixelPos + 2] = curColor.b;
      imageData.data[pixelPos + 3] = 255;
    }
}
