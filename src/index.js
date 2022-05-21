import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { SudokuProvider } from './context/SudokuContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<SudokuProvider>
			<App />
		</SudokuProvider>
	</React.StrictMode>
)
