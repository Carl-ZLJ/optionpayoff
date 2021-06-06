import React, { useContext } from 'react'
import  { Context } from '../App.js'
import config from '../resource.js'
import OptionData from '../classes/OptionData.js'


export default function Examples() {
	const { call, put, setOptions } = useContext(Context)

	const handleStrategyChange = (name) => {
		const { buy, sell } = config.examples[name]
		let options = []
		for (const contract of buy) {
			options.push(new OptionData({
				contract: contract,
				direction: 'buy',
				kind: contract.includes('购') ? 'call' : 'put',
				price: contract.includes('购') ? call[contract][0] : put[contract][0],
				strike: contract.includes('购') ? call[contract][2] : put[contract][0],
			}))
		}
		for (const contract of sell) {
			options.push(new OptionData({
				contract: contract,
				direction: 'sell',
				kind: contract.includes('购') ? 'call' : 'put',
				price: contract.includes('购') ? call[contract][1] : put[contract][1],
				strike: contract.includes('购') ? call[contract][2] : put[contract][2],
			}))
		}

		setOptions(options)
	}

	return (
		<div className="container">
			<header className="header">Example Strategies</header>
			<ul className="example-list">
				<li onClick={() => handleStrategyChange('bullCallSpread')}>Bull call spread</li>
			</ul>
		</div>
	)
}
