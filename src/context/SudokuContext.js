import { createContext, useEffect, useState } from 'react'
import boardGenerator from '../logic/SudokuBoard'
const SudokuContext = createContext()

const SudokuProvider = ({ children }) => {
	const [board, setBoard] = useState([])
	const [selectedBox, setSelectedBox] = useState({ i: -1, j: -1 })

	const solve = () => {
		boardGenerator.solve()
		setBoard([...boardGenerator.board])
	}

	const reset = () => {
		boardGenerator.resetBoard()
		setBoard([...boardGenerator.board])
	}

	const selectBox = (i, j) => {
		setSelectedBox({ i, j })
		boardGenerator.selectBox(i, j)
		setBoard([...boardGenerator.board])
	}

	const fillBox = (val) => {
		boardGenerator.fillBox(selectedBox.i, selectedBox.j, val)
		setBoard([...boardGenerator.board])
		if (boardGenerator.isSolved()) {
			return setTimeout(() => {
				alert(
					'Congratulations!!! You have Successfully Solved The Board....'
				)
				reset()
			}, 500)
		}
	}

	useEffect(reset, [])

	const value = { board, solve, reset, selectBox, fillBox }

	return (
		<SudokuContext.Provider value={value}>
			{children}
		</SudokuContext.Provider>
	)
}

export default SudokuContext
export { SudokuProvider }
