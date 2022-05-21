import React, { useContext } from 'react'
import SudokuContext from '../context/SudokuContext'

export const Button = ({ val }) => {
    const {fillBox} = useContext(SudokuContext);
  return (
		<button className='btn' onClick={() => fillBox(val)}>
			{val}
		</button>
  )
}
