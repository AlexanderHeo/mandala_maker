let canvas, context, w, h,
	prevX = 0, currX = 0, prevY = 0, currY = 0,	draw = false, fill = false

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
	document.querySelector('#eraser').onchange = handleCheckboxChange
	document.querySelector('#lines').onchange = handleCheckboxChange
}

const handleCheckboxChange = e => {
	const name = e.target.name
	console.log(e.target.name)


	if (name === 'eraser') {
		const lines = document.querySelector('#lines')
		if (lines.checked) lines.checked = false
	}

	if (name === 'lines') {
		const eraser = document.querySelector('#eraser')
		if (eraser.checked) eraser.checked = false
	}
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

const handleFillSection = e => {
	recordPointerLocation(e)
	fillSection()
}

const drawLine = () => {
	var a = prevX,
	b = prevY,
	c = currX,
	d = currY

	if (document.querySelector('#eraser').checked) {
		context.strokeStyle = getBackground()
		context.lineWidth = getEraserWidth()
	} else {
		context.strokeStyle = getColor()
		context.lineWidth = getWidth()
	}

	context.lineCap = "round"

	context.beginPath()

	context.moveTo(a, b)
	context.lineTo(c, d)

	context.stroke()
	context.closePath()
}

const fillSection = () => {
	console.log(prevX, prevY, currX, currY)
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
	return document.querySelector("#color").value
}

const getWidth = () => {
	return document.querySelector("#width").value
}

const getEraserWidth = () => {
	return document.querySelector("#eraserSize").value
	console.log(document.querySelector("#eraserSize").value)
}

const getFill = () => {
	return document.querySelector("#fill").value
}

const getBackground = () => {
	return document.querySelector("#background").value
}

const handleBackgroundChange = () => {
	context.fillStyle = getBackground()
	context.fillRect(0, 0, w, h)
}
