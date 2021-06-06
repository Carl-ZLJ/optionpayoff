import React, { useRef, useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import Axis from '../classes/Axis.js'

export default function PayoffChart() {
	const { options } = useContext(Context)
	const [axis, setAxis] = useState(null)
	const ref = useRef(null)

	const initCanvas = (options) => {
		let axisX = 0, axisY = 0
		if(options.length === 0) return
		for (const option of options) {
			const { strike, price } = option 
			if(axisX < strike) {
				axisX = strike
			}
			if(axisY < price) {
				axisY = price
			}
		}
		axisX = Math.round(axisX * 2)
		axisY = axisX

		let canvas = ref.current
		let axis = new Axis(canvas, axisX, axisY)
		
		return axis
	}

	const handleGenerate = () => {
		const x = axis.x
		for (const option of options) {
			const points = option.generatePoints(x)

			axis.drawLine(points)
		}
	}

	const handleCombinePayoffCharts = () => {
		const len = options.length

		let xDots = options.map(option => option.strike).sort((a, b) => a - b)
		xDots.unshift(0)
		xDots.push(axis.x)
		xDots = Array.from(new Set(xDots))

		const points = []
		for(let i = 0; i < xDots.length; i++) {
			let tmpY = 0
			for (let j = 0; j < len; j++) {
				tmpY += options[j].func(xDots[i])
			}
			points.push([xDots[i], tmpY])
		}
		axis.drawLine(points, { color: 'green' })
	}

	const handleClear = () => {
		axis.clear()
	}

	useEffect(() => {
		if(options.length === 0) return
		const axis = initCanvas(options)
		setAxis(axis)
	}, [options])

	return (
		<div className="container">
			<header className="header">
				Payoff Chart
			</header>
			<div className="actions">
				<button onClick={handleGenerate}>Generate</button>
				<button onClick={handleCombinePayoffCharts}>Combine</button>
				<button onClick={handleClear}>Clear</button>
			</div>
			<canvas ref={ref}></canvas>
		</div>
	)
}
