import React, { useContext } from 'react'
import SudokuContext from '../context/SudokuContext'

export const Box = ({ data }) => {
	const { selectBox } = useContext(SudokuContext)
	const { box, row, col } = data
	document.onclick = (e) => {
		if (
			!e.target.className.includes('box') &&
			!e.target.className.includes('btn')
		)
			selectBox(-1, -1)
	}
	let boxClass = 'box'
	if (box.isFixed) boxClass += ' box-fixed'
	if (box.isWrong) boxClass += ' box-wrong'
	if (box.isSelected) boxClass += ' box-selected'
	return (
		<div className={boxClass} onClick={() => selectBox(row, col)}>
			{box.val}
		</div>
	)
}
