import React, { useContext, useState } from 'react'
import { Context } from '../App.js'
import OptionData from '../classes/OptionData.js'

export default function AddOption() {
	const { options, call, put, setOptions} = useContext(Context)
	const [tmpCall, setTmpCall] = useState('')
	const [callDirect, setCallDirect] = useState('buy')
	const [tmpPut, setTmpPut] = useState('')
	const [putDirect, setPutDirect] = useState('sell')

	const handleAddCallButton = () => {
		if(tmpCall === '') return
		setOptions([
			...options,
			new OptionData({
				contract: tmpCall,
				direction: callDirect,
				kind: 'call',
				price: callDirect === 'buy' ? call[tmpCall][0] : call[tmpCall][1],
				strike: call[tmpCall][2],
			}),
		])
	}

	const handleAddPutButton = () => {
		if (tmpPut === '') return
		setOptions([
			...options,
			new OptionData({
				contract: tmpPut,
				direction: putDirect,
				kind: 'put',
				price: putDirect === 'buy' ? put[tmpPut][0] : put[tmpPut][1],
				strike: put[tmpPut][2],
			}),
		])
	}

	const handleChange = (e) => {
		e.preventDefault()
		e.target.name === 'call' ? setTmpCall(e.target.value) : setTmpPut(e.target.value)
	}

	const handleDirectionChange = (e) => {
		e.preventDefault()
		e.target.name === 'callDirection' ? setCallDirect(e.target.value) : setPutDirect(e.target.value)
	}

	return (
		<div className='addOption actions'>
			<div>
				<select name="callDirection" onChange={handleDirectionChange} value={callDirect}>
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
				</select>
				<select name="call" onChange={handleChange} value={tmpCall}>
					<option>Please select ...</option>
					{

						call !== null ? 
							Object.keys(call).map(c => {
								return <option value={c} key={c}>{c}</option>
							}) : <option value="">Loading ...</option>

					}
				</select>
				<button onClick={handleAddCallButton}>Add Call</button>
			</div>
			<div>
				<select name="putDirection" onChange={handleDirectionChange} value={putDirect}>
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
				</select>
				<select name="put" onChange={handleChange} value={tmpPut}>
					<option>Please select ...</option>
					{
						put !== null ? Object.keys(put).map(p => {
							return <option value={p} key={p}>{p}</option>
						}) : <option value="">Loading ...</option>
					}
				</select>
				<button onClick={handleAddPutButton}>Add Put</button>
			</div>
		</div>
	)
}
