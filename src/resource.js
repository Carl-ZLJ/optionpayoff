const config =
{
	base: "/list=",
	call: "/list=OP_UP_",
	put: "/list=OP_DOWN_",
	examples: {
		bullCallSpread: {
			buy: ['50ETF购6月3600'],
			sell: ['50ETF购6月4400'],
		},
		bullPutSpread: {
			buy: ['50ETF沽6月3400'],
			sell: ['50ETF沽6月3800'],
		},
		butterfly: [],
	}
}

export default config