/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const handlePointerDown = (e) => {
  recordPointerLocation(e);
  console.log('tool:', tool);
  if (tool === 'line' || tool === 'eraser') {
    draw = true;
  } else if (tool === 'fill') {
    draw = false;
    fillSection(e);
  }
};

const handlePointerMove = (e) => {
  if (draw) {
    recordPointerLocation(e);
    if (tool === 'fill') {
      fillSection();
    } else {
      drawLine();
    }
  }
};

const recordPointerLocation = (e) => {
  prevX = curX;
  prevY = curY;
  curX = e.clientX - canvas.offsetLeft;
  curY = e.clientY - canvas.offsetTop;
};

const drawLine = () => {
  context.beginPath();
  if (tool === 'eraser') {
    context.strokeStyle = getBackground();
    context.lineWidth = getEraserSize();
    context.lineCap = 'square';
  } else {
    context.strokeStyle = getColor();
    context.lineWidth = getWidth();
    context.lineCap = 'round';
  }
  context.moveTo(prevX, prevY);
  context.lineTo(curX, curY);
  context.stroke();
  context.closePath();

  let slices = getSlices();
  _start = 0;
  _angle = 360 / slices;
  while (slices--) {
    _start += _angle;
    let rP = rotate({ x: prevX, y: prevY }, center, _start);
    let rC = rotate({ x: curX, y: curY }, center, _start);
    rotateStroke(rP, rC);
  }
};

const rotate = (point, center, angle) => {
  angle = d2r(angle);
  const xRotated =
    (point.x - center.x) * Math.cos(angle) -
    (point.y - center.y) * Math.sin(angle) +
    center.x;
  const yRotated =
    (point.x - center.x) * Math.sin(angle) +
    (point.y - center.y) * Math.cos(angle) +
    center.y;
  return { x: xRotated, y: yRotated };
};

const d2r = (deg) => (deg * Math.PI) / 180;

const rotateStroke = (start, end) => {
  context.beginPath();
  if (tool === 'eraser') {
    context.strokeStyle = getBackground();
    context.lineWidth = getEraserSize();
  } else {
    context.lineWidth = getWidth();
    context.strokeStyle = getColor();
  }
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
  context.closePath();
};

const stopDrawing = () => {
  draw = false;
};

const clearCanvas = () => {
  context.fillStyle = getBackground();
  context.fillRect(0, 0, canvas.width, canvas.height);
};
