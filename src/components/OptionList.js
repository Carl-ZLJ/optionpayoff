import React, { useContext } from 'react'
import Option from './Option.js'
import { Context } from '../App.js'
import OptionData from '../classes/OptionData.js'


export default function OptionList() {
	const { options, setOptions } = useContext(Context)

	const handleAddLegButton = () => {
		setOptions([...options, new OptionData({
			direction: 'sell',
			kind: 'put',
			strike: '3150',
			expiry: '2021-06-30',
			price: 261.73,
		})])
	}

	const handleDeleteLegButton = (index) => {
		let s = options.slice()
		s.splice(index, 1)
		setOptions(s)
	}

	const handleChange = (e, index) => {
		e.preventDefault()
		let s = options.slice()
		// console.log('event', e.target.name)
		const newOption = {
			...s[index],
			[e.target.name]: e.target.value,
		}
		s.splice(index, 1)
		setOptions([
			...s,
			new OptionData(newOption),
		])
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Direction</th>
					<th>Kind</th>
					<th>Strike</th>
					<th>Expiry</th>
					<th>Price</th>
					<th>
						<button onClick={handleAddLegButton}>Add Leg</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{options && options.map((option, index) =>
					(
						<tr key={index}>
						<Option data={option} handleChange={(e) => handleChange(e, index)}/>
							<td>
								<button onClick={() => handleDeleteLegButton(index)}>Delete</button>
							</td>
						</tr>
					)
				)}
			</tbody>
		</table>		
	)
}
