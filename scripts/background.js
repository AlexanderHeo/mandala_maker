/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const handleBackgroundChange = () => {
  const bgc = getBackground();
  const lineShade = lightOrDark(bgc);
  const overlay = document.querySelector(".overlay");

  if (lineShade === "light") {
    overlay.classList.remove("dark");
    overlay.classList.add("light");
  } else if (lineShade === "dark") {
    overlay.classList.remove("light");
    overlay.classList.add("dark");
  }

  context.fillStyle = bgc;
  context.fillRect(0, 0, w, h);
};

const lightOrDark = (color) => {
  var r, g, b, hsp;

  color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
  r = color >> 16;
  g = (color >> 8) & 255;
  b = color & 255;

  // http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) return "dark";
  else return "light";
};
