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
  const backgrounds = document.querySelectorAll('.background-color');
  const overlays = document.querySelectorAll('.overlay');

  buttons.forEach((el) => el.addEventListener('click', handleButtonClick));
  colors.forEach((el) => el.addEventListener('click', handleColorChange));
  colorWell.addEventListener('change', handleColorWellChange);
  lineSize.forEach((el) => el.addEventListener('click', handleLineWidth));
  erasers.forEach((el) => el.addEventListener('click', handleEraser));
  backgrounds.forEach((el) => {
    el.addEventListener('click', (e) => {
      handleBackground(e);
      handleBackgroundChange();
    });
  });
  overlays.forEach((el) =>
    el.addEventListener('change', (e) => {
      handleOverlaySelect(e);
    })
  );
};

const handleButtonClick = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  if (name === 'line' || name === 'eraser') {
    handleToolButton(e);
  } else if (name === 'frame') {
    handleFrame();
  } else if (name === 'new') {
    clearCanvas();
  } else if (name === 'save') {
    savePic();
  } else {
    handleGuides(e);
  }
};

const handleToolButton = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  tool = name;
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

  tool = 'line';
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

  tool = 'line';
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

  tool = 'eraser';
  activeEl.classList.remove('active');
  clickedEl.classList.add('active');
  line.classList.remove('active');
  eraser.classList.add('active');
};

const handleBackground = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  const activeEl = document.querySelector('.background-color.active');
  const clickedEl = document.querySelector(`.background-color.${name}`);

  activeEl.classList.remove('active');
  clickedEl.classList.add('active');
};

const handleFrame = () => {
  const button = document.querySelector('.frame-button');
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    button.classList.add('active');
  }
  document.querySelector('.overlayframe').classList.toggle('hide');
};

const handleGuides = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  console.log('name:', name);
  const el = document.querySelector(`.${name}-button`);
  if (el.classList.contains('active')) {
    el.classList.remove('active');
  } else {
    el.classList.add('active');
  }
  if (name !== 'points') {
    const cir = document.querySelector(`#guide${name[6]}Circle`);
    if (cir.classList.value.includes('hide')) {
      cir.classList.remove('hide');
    } else {
      cir.classList.add('hide');
    }
  } else if (name === 'points') {
    const cross = document.querySelectorAll('.cross');
    cross.forEach((cross) => cross.classList.toggle('hide'));
  }
};

const handleOverlaySelect = (e) => {
  const target = e.currentTarget;
  const name = target.name;
  if (name === 'pointsSize') handlePoints(e);
  else handleCircles(e);
};
