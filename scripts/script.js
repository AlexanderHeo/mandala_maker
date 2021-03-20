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
	curColor;

const init = () => {
	canvas = document.querySelector('canvas')
	context = canvas.getContext('2d')
	w = canvas.width
	h = canvas.height
	prevX = 0
	prevY = 0
	curX = 0
	curY = 0
	center = { x: w / 2, y: h / 2 }
	tool = 'line'
	_start = 0
	curColor = {r:0, g:0, b:0}

	addListeners()
	handlePoints()
}

const addListeners = () => {
	canvas.onpointerdown = handlePointerDown
	canvas.onpointermove = handlePointerMove
	canvas.onpointerup = stopDrawing
	canvas.onpointerout = stopDrawing
	canvas.style.cursor = "crosshair"

	const buttons = document.querySelectorAll(".button")
	const overlay = document.querySelectorAll(".overlay")
	buttons.forEach((x) => x.addEventListener("click", handleButtonClick))
	overlay.forEach((x) => x.addEventListener("change", (e) => handleOverlaySelect(e)))
	document.querySelector("#background").onchange = handleBackgroundChange;
}

const handleButtonClick = e => {
	const name = e.target.name
	if (name === "new") {
		clearCanvas()
	} else if (name === "save") {
		savePic()
	} else if (name === "frame") {
		toggleFrame()
	} else if (name === "line" || name === "eraser" || name === "fill") {
		handleToolButton(e)
	} else if (name === "guide1" || name === "guide2" || name === "guide3" || name === "points") {
		handleOverlayButton(e)
	}
}

const handleToolButton = e => {
	const name = e.target.name
	tool = name
	const clicked = document.querySelector(`#${name}`)
	const line = document.querySelector('#line')
	const eraser = document.querySelector("#eraser")
	// const fill = document.querySelector("#fill")
	if (line.classList.value.includes("active")) line.classList.remove("active")
	if (eraser.classList.value.includes("active")) eraser.classList.remove("active")
	// if (fill.classList.value.includes("active")) fill.classList.remove("active")
	clicked.classList.toggle("active")
}

const handleOverlayButton = e => {
	const name = e.target.name
	const el = document.querySelector(`#${name}`)
	if (el.classList.value.includes("active")) {
		el.classList.remove("active")
	} else {
		el.classList.add("active")
	}
	if (name !== "points") {
		const cir =	document.querySelector(`#${name}Circle`)
		if (cir.classList.value.includes("hide")) {
			cir.classList.remove("hide")
		} else {
			cir.classList.add("hide")
		}
	} else if (name === "points") {
		const crosses = document.querySelectorAll(".cross")
		crosses.forEach(x => x.classList.toggle('hide'))
	}
}

const handleOverlaySelect = e => {
	const name = e.target.name
	if (name === "pointsSize") handlePoints(e)
	else handleCircles(e)
}

const toggleFrame = () => {
	document.querySelector("#frame").classList.toggle("active")
	document.querySelector(".overlayframe").classList.toggle("hide")
}
