import { useContext } from 'react'
import SudokuContext from '../context/SudokuContext'
import { Button } from './Button'
import { SodokuBoard } from './SodokuBoard'
import './soduku.css'

function App() {
	const { solve, reset } = useContext(SudokuContext)
	return (
		<div className='container'>
			<h1 style={{ margin: '1rem 0' }}>React Sodoku</h1>
			<SodokuBoard />
			<div className='btn-group'>
				<button className='btn' onClick={() => solve()}>
					Solve Board
				</button>
				<button className='btn' onClick={() => reset()}>
					Reset Board
				</button>
			</div>
			<div className='btn-group'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
					return <Button key={ele} val={ele} />
				})}
			</div>
		</div>
	)
}

export default App
