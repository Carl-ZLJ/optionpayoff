import React, { useContext } from 'react'
import Option from './Option.js'
import AddOption from './AddOption.js'
import { Context } from '../App.js'

export default function OptionList() {
	const { options, setOptions } = useContext(Context)

	const handleDeleteLegButton = (index) => {
		let s = options.slice()
		s.splice(index, 1)
		setOptions(s)
	}

	return (
		<>
			<AddOption />
			<table>
				<thead>
					<tr>
						<th>Contract</th>
						<th>Direction</th>
						<th>Kind</th>
						<th>Strike</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{options.length === 0 ? 
						<tr>
							<td>Please add options ...</td>
						</tr>
						: options.map((option, index) =>
							(
								<tr key={index}>
									<Option data={option} />
									<td>
										<button onClick={() => handleDeleteLegButton(index)}>Delete</button>
									</td>
								</tr>
							)
						)}
				</tbody>
			</table>		
		</>
	)
}
