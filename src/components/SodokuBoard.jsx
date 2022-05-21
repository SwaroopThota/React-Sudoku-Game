import React, { useContext } from 'react'
import SudokuContext from '../context/SudokuContext'
import { Box } from './Box'

export const SodokuBoard = () => {
	const { board } = useContext(SudokuContext)
	return (
		<>
			{board.map((line, row) => (
				<div className='row' key={row}>
					{line.map((box, col) => (
						<Box
							data={{ box, row, col }}
							key={row.toString() + col.toString()}
						/>
					))}
				</div>
			))}
		</>
	)
}
