/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const savePic = () => {
	const downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "MandalaMaker.png");
  const dataUrl = canvas.toDataURL("image/png");
  const url = dataUrl.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
}
