import React from 'react'

export default function Option({data, handleChange}) {

	return (
		<>
			<td>
				<select name="direction" value={data.direction} onChange={handleChange}>
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
				</select>
			</td>
			<td>
				<select name="kind" value={data.kind} onChange={handleChange}>
					<option value="call">Call</option>
					<option value="put">Put</option>
				</select>
			</td>
			<td>
				<input type="number" name="strike" step="1" min="0" value={data.strike} onChange={handleChange}/>
			</td>
			<td>
				<input type="date" name="expiry" value={data.expiry} onChange={handleChange}/>
			</td>
			<td>
				{data.price}
			</td>
		</>
	)
}
