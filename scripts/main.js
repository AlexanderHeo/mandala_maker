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
	handlePoints()
}

const addClickListeners = () => {
	document.querySelector("#clear").onclick = clearCanvas
	document.querySelector('#menu-close-button').onclick = toggleMenu
	document.querySelector('#background').onchange = handleBackgroundChange
	document.querySelector('#eraser').onchange = handleCheckboxChange
	document.querySelector('#lines').onchange = handleCheckboxChange
	document.querySelector('#guideToggle').onchange = handleGuideCB
	document.querySelector('#points').onchange = handlePoints

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

const handlePoints = e => {
	let points = "twelve"
	if (e) points = e.target.value

	const overlay = document.querySelector('.overlaycross')

	if (points === 'two' || points === 'four' || points === 'eight' || points === 'sixteen') {
		while (overlay.hasChildNodes()) {
			overlay.removeChild(overlay.lastChild)
		}
		const el = document.createElement('div')
		el.classList.add('cross')
		el.classList.add('one')
		el.classList.add('one1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('two')
		el2.classList.add('two1')
		overlay.appendChild(el)
		overlay.appendChild(el2)
	}

	if (points === 'four' || points === 'eight' || points === 'sixteen') {
		const el = document.createElement('div')
		el.classList.add('cross')
		el.classList.add('two')
		el.classList.add('four1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('two')
		el2.classList.add('four2')
		overlay.appendChild(el)
		overlay.appendChild(el2)
	}

	if (points === 'eight' || points === 'sixteen') {
		const el = document.createElement('div')
		el.classList.add('cross')
		el.classList.add('two')
		el.classList.add('eight1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('two')
		el2.classList.add('eight2')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('two')
		el3.classList.add('eight3')
		const el4 = document.createElement('div')
		el4.classList.add('cross')
		el4.classList.add('two')
		el4.classList.add('eight4')
		overlay.appendChild(el)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
		overlay.appendChild(el4)
	}

	if (points === 'sixteen') {
		const el1 = document.createElement('div')
		el1.classList.add('cross')
		el1.classList.add('two')
		el1.classList.add('sixteen1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('two')
		el2.classList.add('sixteen2')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('two')
		el3.classList.add('sixteen3')
		const el4 = document.createElement('div')
		el4.classList.add('cross')
		el4.classList.add('two')
		el4.classList.add('sixteen4')
		const el5 = document.createElement('div')
		el5.classList.add('cross')
		el5.classList.add('two')
		el5.classList.add('sixteen5')
		const el6 = document.createElement('div')
		el6.classList.add('cross')
		el6.classList.add('two')
		el6.classList.add('sixteen6')
		const el7 = document.createElement('div')
		el7.classList.add('cross')
		el7.classList.add('two')
		el7.classList.add('sixteen7')
		const el8 = document.createElement('div')
		el8.classList.add('cross')
		el8.classList.add('two')
		el8.classList.add('sixteen8')
		overlay.appendChild(el1)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
		overlay.appendChild(el4)
		overlay.appendChild(el5)
		overlay.appendChild(el6)
		overlay.appendChild(el7)
		overlay.appendChild(el8)
	}

	if (points === 'three' || points === 'six' || points === 'twelve' || points === 'tf') {
		while (overlay.hasChildNodes()) {
			overlay.removeChild(overlay.lastChild)
		}
		const el1 = document.createElement('div')
		el1.classList.add('cross')
		el1.classList.add('one')
		el1.classList.add('one1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('three')
		el2.classList.add('three1')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('three')
		el3.classList.add('three2')
		overlay.appendChild(el1)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
	}

	if (points === 'six' || points === 'twelve' || points === 'tf') {
		const el1 = document.createElement('div')
		el1.classList.add('cross')
		el1.classList.add('three')
		el1.classList.add('six1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('three')
		el2.classList.add('six2')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('three')
		el3.classList.add('six3')
		const el4 = document.createElement('div')
		el4.classList.add('cross')
		el4.classList.add('three')
		el4.classList.add('six4')
		overlay.appendChild(el1)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
		overlay.appendChild(el4)
	}

	if (points === 'twelve' || points === 'tf') {
		const el1 = document.createElement('div')
		el1.classList.add('cross')
		el1.classList.add('three')
		el1.classList.add('twelve1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('three')
		el2.classList.add('twelve2')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('three')
		el3.classList.add('twelve3')
		const el4 = document.createElement('div')
		el4.classList.add('cross')
		el4.classList.add('three')
		el4.classList.add('twelve4')
		const el5 = document.createElement('div')
		el5.classList.add('cross')
		el5.classList.add('three')
		el5.classList.add('twelve5')
		const el6 = document.createElement('div')
		el6.classList.add('cross')
		el6.classList.add('three')
		el6.classList.add('twelve6')
		const el7 = document.createElement('div')
		el7.classList.add('cross')
		el7.classList.add('three')
		el7.classList.add('twelve7')
		const el8 = document.createElement('div')
		el8.classList.add('cross')
		el8.classList.add('three')
		el8.classList.add('twelve8')
		overlay.appendChild(el1)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
		overlay.appendChild(el4)
		overlay.appendChild(el5)
		overlay.appendChild(el6)
		overlay.appendChild(el7)
		overlay.appendChild(el8)
	}

	if (points === 'tf') {
		const el1 = document.createElement('div')
		el1.classList.add('cross')
		el1.classList.add('three')
		el1.classList.add('tf1')
		const el2 = document.createElement('div')
		el2.classList.add('cross')
		el2.classList.add('three')
		el2.classList.add('tf2')
		const el3 = document.createElement('div')
		el3.classList.add('cross')
		el3.classList.add('three')
		el3.classList.add('tf3')
		const el4 = document.createElement('div')
		el4.classList.add('cross')
		el4.classList.add('three')
		el4.classList.add('tf4')
		const el5 = document.createElement('div')
		el5.classList.add('cross')
		el5.classList.add('three')
		el5.classList.add('tf5')
		const el6 = document.createElement('div')
		el6.classList.add('cross')
		el6.classList.add('three')
		el6.classList.add('tf6')
		const el7 = document.createElement('div')
		el7.classList.add('cross')
		el7.classList.add('three')
		el7.classList.add('tf7')
		const el8 = document.createElement('div')
		el8.classList.add('cross')
		el8.classList.add('three')
		el8.classList.add('tf8')
		const el9 = document.createElement('div')
		el9.classList.add('cross')
		el9.classList.add('three')
		el9.classList.add('tf9')
		const el10 = document.createElement('div')
		el10.classList.add('cross')
		el10.classList.add('three')
		el10.classList.add('tf10')
		const el11 = document.createElement('div')
		el11.classList.add('cross')
		el11.classList.add('three')
		el11.classList.add('tf11')
		const el12 = document.createElement('div')
		el12.classList.add('cross')
		el12.classList.add('three')
		el12.classList.add('tf12')
		const el13 = document.createElement('div')
		el13.classList.add('cross')
		el13.classList.add('three')
		el13.classList.add('tf13')
		const el14 = document.createElement('div')
		el14.classList.add('cross')
		el14.classList.add('three')
		el14.classList.add('tf14')
		const el15 = document.createElement('div')
		el15.classList.add('cross')
		el15.classList.add('three')
		el15.classList.add('tf15')
		const el16 = document.createElement('div')
		el16.classList.add('cross')
		el16.classList.add('three')
		el16.classList.add('tf16')
		overlay.appendChild(el1)
		overlay.appendChild(el2)
		overlay.appendChild(el3)
		overlay.appendChild(el4)
		overlay.appendChild(el5)
		overlay.appendChild(el6)
		overlay.appendChild(el7)
		overlay.appendChild(el8)
		overlay.appendChild(el9)
		overlay.appendChild(el10)
		overlay.appendChild(el11)
		overlay.appendChild(el12)
		overlay.appendChild(el13)
		overlay.appendChild(el14)
		overlay.appendChild(el15)
		overlay.appendChild(el16)

	}
}
