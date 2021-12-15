/* eslint-disable no-unused-vars */
const getColor = () => {
  return document.querySelector('#current-color').value;
};

const getWidth = () => {
  const el = document.querySelector('#current-line');
  const val = el.classList[1];
  switch (val) {
    case 'line-xsmall':
      return 1;
    case 'line-small':
      return 3;
    case 'line-medium':
      return 6;
    case 'line-regular':
      return 9;
    case 'line-large':
      return 15;
    case 'line-xlarge':
      return 20;
    default:
      return 1;
  }
};

const getEraserSize = () => {
  const el = document.querySelector('.eraser-button.active');
  const val = el.classList[1];
  switch (val) {
    case 'xsmall':
      return 1;
    case 'small':
      return 3;
    case 'medium':
      return 6;
    case 'regular':
      return 9;
    case 'large':
      return 15;
    case 'xlarge':
      return 20;
    default:
      return 1;
  }
};

const getBackground = () => {
  const el = document.querySelector('.background-color.active');
  return el.classList[3];
};

const getSlices = () => {
  return document.querySelector('#pointsSize').value;
};
