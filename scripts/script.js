/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let canvas,
  context,
  w,
  h,
  prevX,
  prevY,
  curX,
  curY,
  center,
  draw,
  tool,
  _angle,
  _start,
  erase,
  slices,
  color,
  curColor,
  wellOrButton = 'button';

const init = () => {
  canvas = document.querySelector('canvas');
  context = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  prevX = 0;
  prevY = 0;
  curX = 0;
  curY = 0;
  center = { x: w / 2, y: h / 2 };
  tool = 'line';
  _start = 0;
  curColor = { r: 0, g: 0, b: 0 };

  addListeners();
  handlePoints();
};

const addListeners = () => {
  canvas.onpointerdown = handlePointerDown;
  canvas.onpointermove = handlePointerMove;
  canvas.onpointerup = stopDrawing;
  canvas.onpointerout = stopDrawing;
  canvas.style.cursor = 'crosshair';

  const colors = document.querySelectorAll('.line-color');
  const colorWell = document.querySelector('#current-color');
  colors.forEach((el) => el.addEventListener('click', handleColorChange));
  colorWell.addEventListener('change', handleColorWellChange);
};

const handleColorChange = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  const value = target.value;
  const el = document.querySelector('.color.active');
  const colorEl = document.querySelector(`.color.${name}`);
  const currentColor = document.querySelector('#current-color');
  if (wellOrButton === 'well') {
    wellOrButton = 'button';
  } else if (wellOrButton === 'button') {
    if (el) el.classList.remove('active');
    colorEl.classList.add('active');
  }
  currentColor.value = value;
};

const handleColorWellChange = (e) => {
  const target = e.currentTarget;
  const value = target.value;
  const colorButton = document.querySelector('.line-color.active');

  if (wellOrButton === 'button') {
    colorButton.classList.remove('active');
  }
  wellOrButton = 'well';
};
