/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let canvas, context, w, h, prevX, prevY, curX, curY, draw, slices, color, center, _angle, _start

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
	_start = 0

	addListeners()
	handlePoints()
}

const addListeners = () => {
	canvas.onpointermove = handlePointerMove
	canvas.onpointerdown = handlePointerDown
	canvas.onpointerup = stopDrawing
	canvas.onpointerout = stopDrawing

	const buttons = document.querySelectorAll(".button")
	const checkboxes = document.querySelectorAll(".checkbox-container")
	const selects = document.querySelectorAll(".select")

	buttons.forEach((x) => x.addEventListener("click", handleButtonClick))
	checkboxes.forEach((x) => x.addEventListener("change", handleCheckboxClick))
	selects.forEach((x) => x.addEventListener("change", handleSelectChange))
	document.querySelector("#background").onchange = handleBackgroundChange;
}

const handleButtonClick = e => {
	const name = e.target.name
	if (name === "menu") {
		document.querySelector('.menu').classList.toggle('hide')
	} else if (name === "save") {
		const downloadLink = document.createElement('a')
		downloadLink.setAttribute('download', 'MandalaMaker.png')
		const dataUrl = canvas.toDataURL('image/png')
		const url = dataUrl.replace(/^data:image\/png/,'data:application/octet-stream')
		downloadLink.setAttribute('href', url)
		downloadLink.click()
	} else if (name === "clear") {
		context.clearRect(0, 0, w, h)
		context.getStyle = getBackground()
		context.fillRect(0, 0, w, h)
	}
}
const handleCheckboxClick = e => {
	const name = e.target.name
	if (name === 'cross') {
		const allCross = document.querySelectorAll('.cross')
		allCross.forEach(x => x.classList.toggle('hide'))
	} else {
		console.log(name)
		document.querySelector(`#${name}Circle`).classList.toggle('hide')
	}
}
const handleSelectChange = e => {
	const name = e.target.name
	if (name === "points") {
		handlePoints(e)
	} else {
		handleCircles(e)
	}
}
