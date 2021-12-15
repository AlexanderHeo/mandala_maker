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

  const buttons = document.querySelectorAll('.button');
  const colors = document.querySelectorAll('.line-color');
  const colorWell = document.querySelector('#current-color');
  const lineSize = document.querySelectorAll('.line-size');
  const erasers = document.querySelectorAll('.eraser-button');

  buttons.forEach((el) => el.addEventListener('click', handleButtonClick));
  colors.forEach((el) => el.addEventListener('click', handleColorChange));
  colorWell.addEventListener('change', handleColorWellChange);
  lineSize.forEach((el) => el.addEventListener('click', handleLineWidth));
  erasers.forEach((el) => el.addEventListener('click', handleEraser));
};

const handleButtonClick = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  if (name === 'line' || name === 'eraser') {
    handleToolButton(e);
  }
};

const handleToolButton = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  const line = document.querySelector('.line-picker-button');
  const eraser = document.querySelector('.eraser-picker-button');
  if (name === 'line') {
    line.classList.add('active');
    eraser.classList.remove('active');
  } else if (name === 'eraser') {
    eraser.classList.add('active');
    line.classList.remove('active');
  }
};

const handleColorChange = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  const value = target.value;
  const el = document.querySelector('.color.active');
  const colorEl = document.querySelector(`.color.${name}`);
  const currentColor = document.querySelector('#current-color');
  const line = document.querySelector('.line-picker-button');
  const eraser = document.querySelector('.eraser-picker-button');

  if (wellOrButton === 'well') {
    wellOrButton = 'button';
  } else if (wellOrButton === 'button') {
    if (el) el.classList.remove('active');
    colorEl.classList.add('active');
  }
  currentColor.value = value;
  line.classList.add('active');
  eraser.classList.remove('active');
};

const handleColorWellChange = (e) => {
  const target = e.currentTarget;
  const value = target.value;
  const colorButton = document.querySelector('.line-color.active');
  const line = document.querySelector('.line-picker-button');
  const eraser = document.querySelector('.eraser-picker-button');

  if (wellOrButton === 'button') {
    colorButton.classList.remove('active');
  }
  wellOrButton = 'well';
  line.classList.add('active');
  eraser.classList.remove('active');
};

const handleLineWidth = (e) => {
  const target = e.currentTarget;
  const size = target.dataset.size;
  const activeEl = document.querySelector('.line-size.active');
  const clickedEl = document.querySelector(`.line-size.${size}`);
  const currentSizeEl = document.querySelector('#current-line');

  activeEl.classList.remove('active');
  clickedEl.classList.add('active');
  currentSizeEl.classList.remove(currentSizeEl.classList.item(1));
  currentSizeEl.classList.add(`line-${size}`);
};

const handleEraser = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  const activeEl = document.querySelector('.eraser-button.active');
  const clickedEl = document.querySelector(`.eraser-button.${name}`);
  const line = document.querySelector('.line-picker-button');
  const eraser = document.querySelector('.eraser-picker-button');

  activeEl.classList.remove('active');
  clickedEl.classList.add('active');
  line.classList.remove('active');
  eraser.classList.add('active');
};
