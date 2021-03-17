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
	document.querySelector('#guideToggle').onchange = handleGuideCB

	const guide = document.querySelectorAll('.guideCB')
	guide.forEach(x => {
		x.addEventListener('change', handleGuideCB)
	})
	const guideSize = document.querySelectorAll('.guideSizeSelect')
	guideSize.forEach(x => {
		x.addEventListener('change', handleGuideSize)
	})
}

const handleCheckboxChange = e => {
	const name = e.target.name

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
	var a = prevX, b = prevY, c = currX, d = currY

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
}

const getFill = () => {
	return document.querySelector("#fill").value
}

const getBackground = () => {
	return document.querySelector("#background").value
}

const handleBackgroundChange = () => {
	const bgc = getBackground()
	const lineShade = lightOrDark(bgc)
	const overlay = document.querySelector('.overlay')

	if (lineShade === 'light') {
		overlay.classList.remove('dark')
		overlay.classList.add('light')
	} else if (lineShade === 'dark') {
		overlay.classList.remove('light')
		overlay.classList.add('dark')
	}

	context.fillStyle = bgc
	context.fillRect(0, 0, w, h)
}

const lightOrDark = color => {
	var r, g, b, hsp

	color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))
	r = color >> 16
	g = color >> 8 & 255
	b = color & 255

	// http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b)
	)

	if (hsp > 127.5) return 'dark'
	else return 'light'
}

const handleGuideCB = e => {
	const name = e.target.name
	if (name === 'guideToggle') {
		const cross = document.querySelectorAll('.cross')
		cross.forEach(x => {
			x.classList.toggle('hide')
		})
	} else {
		document.querySelector(`#${name}Circle`).classList.toggle('hide')
	}
}

const handleGuideSize = e => {
	const name = e.target.name
	const value = e.target.value
	const num = name.charAt(5)
	const el = document.querySelector(`#guide${num}Circle`)
	if (el.classList.value.includes('one')) el.classList.remove('one')
	if (el.classList.value.includes('two')) el.classList.remove('two')
	if (el.classList.value.includes('three')) el.classList.remove('three')
	if (el.classList.value.includes('four')) el.classList.remove('four')
	if (el.classList.value.includes('five')) el.classList.remove('five')
	el.classList.add(value)
}
