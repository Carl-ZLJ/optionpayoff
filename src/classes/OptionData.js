export default class OptionData {
	constructor(option) {
		this.direction = option.direction
		this.kind = option.kind
		this.strike = parseInt(option.strike)
		this.price = option.price
		this.expiry = option.expiry

		if(this.kind === 'call' && this.direction === 'buy') {
			this.func = function(x) {
				if(x <= this.strike) {
					return -this.price 
				} else {
					return x - this.strike - this.price
				}
			}
		}
		if(this.kind === 'call' && this.direction === 'sell') {
			this.func = function(x) {
				if(x <= this.strike) {
					return this.price
				} else {
					return this.strike - x + this.price
				}
			}
		}
		if(this.kind === 'put' && this.direction === 'buy') {
			this.func = function(x) {
				if(x <= this.strike) {
					return this.strike - this.price - x
				} else {
					return -this.price
				}
			}
		}
		if(this.kind === 'put' && this.direction === 'sell') {
			this.func = function (x) {
				if(x <= this.strike) {
					return this.price - this.strike + x
				} else {
					return this.price
				}
			}
		}
	}

	generatePoints(x) {
		const points = [
			[0, this.func(0)],
			[this.strike, this.func(this.strike)],
			[x, this.func(x)],
		]
		return points
	}
}