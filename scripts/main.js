let canvas, context, w, h,
	prevX = 0, currX = 0, prevY = 0, currY = 0,	draw = false

function init() {
	canvas = document.querySelector("canvas")
	context = canvas.getContext("2d")
	w = canvas.width
	h = canvas.height

	canvas.onpointermove = handlePointerMove
	canvas.onpointerdown = handlePointerDown
	canvas.onpointerup = stopDrawing
	canvas.onpointerout = stopDrawing

	context.fillStyle = getBackground()
	context.fillRect(0, 0, w, h)

	addClickListeners()
}

const addClickListeners = () => {
	document.querySelector("#clear").onclick = clearCanvas
	document.querySelector('#menu-close-button').onclick = toggleMenu
	document.querySelector('#background').onchange = handleBackgroundChange
}

const toggleMenu = () => {
	document.querySelector('.menu').classList.toggle('hide')
}

const recordPointerLocation = e => {
	prevX = currX
	prevY = currY
	currX = e.clientX - canvas.offsetLeft
	currY = e.clientY - canvas.offsetTop
}

const handlePointerMove = e => {
	if (draw) {
		recordPointerLocation(e)
		drawLine()
	}
}

const handlePointerDown = e => {
	recordPointerLocation(e)
	draw = true
}

const drawLine = () => {
	var a = prevX,
	b = prevY,
	c = currX,
	d = currY

	context.strokeStyle = getColor()
	context.lineWidth = getWidth()
	context.lineCap = "round"

	context.beginPath()

	context.moveTo(a, b)
	context.lineTo(c, d)

	context.stroke()
	context.closePath()
}

const stopDrawing = () => {
	draw = false
}

const clearCanvas = () => {
	context.clearRect(0, 0, w, h)
	context.getStyle = getBackground()
	context.fillRect(0, 0, w, h)
}

const getColor = () => {
	return document.querySelector("#line").value
	// return '#000000'
}

const getWidth = () => {
	return document.querySelector("#width").value
	// return 1
}

const getFill = () => {
	return document.querySelector("#fill").value
	// return '#c0de25'
}

const getBackground = () => {
	return document.querySelector("#background").value
	// return '#e1e1e1'
}

const handleBackgroundChange = () => {
	context.fillStyle = getBackground()
	context.fillRect(0, 0, w, h)
}
