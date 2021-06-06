import React from 'react'

export default function Option({data}) {

	return (
		<>
			<td>
				{data.contract}
			</td>
			<td>
				{data.direction}
			</td>
			<td>
				{data.kind}
			</td>
			<td>
				{data.strike}
			</td>
			<td>
				{data.price}
			</td>
		</>
	)
}
