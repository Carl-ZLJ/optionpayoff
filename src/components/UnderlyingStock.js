import React, { useContext } from 'react'
import { Context } from '../App.js'

export default function UnderlyingStock() {
	const { stock } = useContext(Context)

	return (
		<div className="container">
			<header className="header">Underlying Stock</header>
			{
				stock === null ? (
					<p>Loading ...</p>
				) : (
					<table className="stock">
						<tbody>
							<tr>
								<th>Name</th>
								<td>{stock.name}</td>
							</tr>
							<tr>
								<th>Price</th>
								<td>{stock.price}</td>
							</tr>
							<tr>
								<th>Date</th>
								<td>{stock.date}</td>
							</tr>
						</tbody>
					</table>
				)
			}
		</div>
	)
}
