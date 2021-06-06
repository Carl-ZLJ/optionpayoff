export default class Axis {
	constructor(canvas, x, y) {
		this.canvas = canvas
		this.x = x
		this.y = y
		this.baseArea = 6300 * 3150
		this.canvas.setAttribute('width', x)
		this.canvas.setAttribute('height', y)

		this.ctx = this.canvas.getContext('2d')
		this.ctx.translate(this.canvas.width / 20, this.canvas.height / 2)
		this.ctx.scale(1, -1)
		
		this.ctx.strokeStyle = 'rgb(200, 0, 0)'
		this.ctx.lineWidth = 16


		this.drawAxisX()
		this.drawAxisY()
	}

	drawAxisX() {
		this.ctx.save()
		this.ctx.setLineDash([4, 3])

		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(this.x, 0)
		this.ctx.stroke()
		this.ctx.restore()
	}

	drawAxisY() {
		this.ctx.save()

		this.ctx.beginPath()
		this.ctx.moveTo(0, -this.y)
		this.ctx.lineTo(0, this.y)
		this.ctx.stroke()
		this.ctx.restore()
	}

	drawLine(points, { color } = { color: 'rgb(217, 20, 0)' }) {
		this.ctx.save()
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = 16
		this.ctx.beginPath()
		this.ctx.moveTo(...points[0])
		for(let i = 1; i < points.length; i++) {
			this.ctx.lineTo(...points[i])
		}
		this.ctx.stroke()
		this.ctx.restore()
	}

	clear() {
		this.ctx.save()
		this.ctx.scale(1, -1)
		this.ctx.translate(-this.canvas.width / 20, -this.canvas.height / 2)
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.restore()

		this.drawAxisX()
		this.drawAxisY()
	}
}