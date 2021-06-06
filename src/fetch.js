import config from './resource.js'

let decoder = new TextDecoder('gb18030')

export async function fetchUnderlyingStock(stockCode) {
	const url = config.base + stockCode
	let ret = await fetch(url, {
		credentials: 'include',
	})
		.then(res => res.text())
		.catch(err => console.log(err))

	ret = ret.split(',')
	
	let o = {
		name: ret[0].split('"')[1],
		price: ret[3],
		date: ret[30] + ' ' + ret[31],
	}
	return o
}

export async function fetchOptionsInfo(stockCode, optionKind, date) {
	const url = config[optionKind] + stockCode + date
		
	let ret = await fetch(url, {
		credentials: 'include',
	})
		.then(res => res.text())
		.catch(err => console.log(err))

	let contracts = handleOptionContractsStr(ret, /CON_OP_[0-9]{8}/gm)

	let options = {}
	for (const contract of contracts) {
		let info = await fetch(config.base + contract)
			.then(res => res.arrayBuffer())
			.catch(err => console.log(err))

		let infoList = handleOptionInfo(info)

		options[infoList[37]] = [infoList[1], infoList[3], infoList[7]]
	}
	return options
}

function handleOptionContractsStr(str, reg) {
	let r = []
	let m
	while ((m = reg.exec(str)) !== null) {
		if(m.index === reg.lastIndex) {
			reg.lastIndex++
		}
		r.push(m[0])
	}
	return r
}

function handleOptionInfo(str) {
	str = decoder.decode(str)
	let r = str.split('=')[1]
	return r.substring(1, r.length - 2).split(',')
}
