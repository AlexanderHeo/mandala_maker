/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const prepareCanvasSize = (windowWidth) => {
  if (windowWidth > 750) {
    setCanvasSize("750");
  } else if (windowWidth > 700) {
    setCanvasSize("700");
  } else if (windowWidth > 650) {
    setCanvasSize("650");
  } else if (windowWidth > 600) {
    setCanvasSize("600");
  } else if (windowWidth > 550) {
    setCanvasSize("550");
  } else if (windowWidth > 500) {
    setCanvasSize("500");
  } else if (windowWidth > 450) {
    setCanvasSize("450");
  } else if (windowWidth > 400) {
    setCanvasSize("400");
  } else if (windowWidth > 350) {
    setCanvasSize("350");
  }
};

const setCanvasSize = (size) => {
  let len;
  switch (size) {
    case "350":
      len = "300";
      break;
    case "400":
      len = "350";
      break;
    case "450":
      len = "400";
      break;
    case "500":
      len = "450";
      break;
    case "550":
      len = "500";
      break;
    case "600":
      len = "550";
      break;
    case "650":
      len = "600";
      break;
    case "700":
      len = "650";
      break;
    case "750":
      len = "700";
      break;
  }
  canvas.height = len;
  canvas.width = len;
  w = len;
  h = len;
  center = { x: w / 2, y: h / 2 };
};
