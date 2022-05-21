class SudokuBoard {
	#unsolvedBoard
	#solvedBoard
	constructor() {
		this.#solvedBoard = []
		this.#unsolvedBoard = []
	}

	get board() {
		return this.#unsolvedBoard
	}

	solve() {
		this.#unsolvedBoard = this.#solvedBoard
	}

	resetBoard() {
		this.#solvedBoard = []
		this.#unsolvedBoard = []
		this.solveMyBoard()
		this.generateBoard()
	}

	solveMyBoard() {
		for (let i = 0; i < 9; i++) {
			this.#solvedBoard[i] = []
			for (let j = 0; j < 9; j++)
				this.#solvedBoard[i][j] = {
					val: '',
					isFixed: true,
					isSelected: false,
					isWrong: false,
				}
		}
		this.fillDiagonalSqaures()
		this.solveHelper(0, 0)
	}

	fillDiagonalSqaures() {
		for (let i = 0; i < 9; i += 3) {
			for (let a = 0; a < 3; a++) {
				for (let b = 0; b < 3; b++) {
					let k = this.generateRandom(1, 9)
					while (!this.checkPos(a + i, b + i, k))
						k = this.generateRandom(1, 9)
					this.#solvedBoard[a + i][b + i].val = k
				}
			}
		}
	}

	generateRandom = (s, e) =>
		parseInt(Math.min(s, e) + Math.random() * (Math.abs(e - s) + 1))

	solveHelper = (i, j) => {
		if (i === 9) return true
		if (j === 9) return this.solveHelper(i + 1, 0)
		if (this.#solvedBoard[i][j].val !== '')
			return this.solveHelper(i, j + 1)
		for (let k = 1; k < 10; k++) {
			if (!this.checkPos(i, j, k)) continue
			this.#solvedBoard[i][j].val = k
			if (this.solveHelper(i, j + 1)) return true
		}
		this.#solvedBoard[i][j].val = ''
		return false
	}

	checkPos = (i, j, val) => {
		for (let k = 0; k < 9; k++) {
			if (
				this.#solvedBoard[i][k].val === val ||
				this.#solvedBoard[k][j].val === val
			)
				return false
		}
		let boxRow = 3 * parseInt(i / 3),
			boxCol = 3 * parseInt(j / 3)
		for (let a = 0; a < 3; a++) {
			for (let b = 0; b < 3; b++) {
				if (this.#solvedBoard[boxRow + a][boxCol + b].val === val)
					return false
			}
		}
		return true
	}

	generateBoard() {
		for (let i = 0; i < 9; i++) {
			this.#unsolvedBoard[i] = []
			for (let j = 0; j < 9; j++) {
				this.#unsolvedBoard[i][j] = { ...this.#solvedBoard[i][j] }
			}
		}
		for (let i = 0; i < 9; i++) {
			let times = this.generateRandom(4, 8)
			for (let j = 1; j <= times; j++) {
				let k = this.generateRandom(0, 8)
				while (!this.#unsolvedBoard[i][k].isFixed)
					k = this.generateRandom(0, 8)
				this.#unsolvedBoard[i][k].val = ''
				this.#unsolvedBoard[i][k].isFixed = false
			}
		}
	}

	selectBox(i, j) {
		this.#unsolvedBoard.map((line) =>
			line.map((box) => (box.isSelected = false))
		)
		if (i === -1 || j === -1 || this.#unsolvedBoard[i][j].isFixed) return
		this.#unsolvedBoard[i][j].isSelected = true
	}

	fillBox(i, j, val) {
		if (i === -1 || j === -1 || this.#unsolvedBoard[i][j].isFixed) return
		this.#unsolvedBoard[i][j].val =
			this.#unsolvedBoard[i][j].val === val ? '' : val
		this.checkBoard()
	}

	isSolved() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (
					this.#solvedBoard[i][j].val !==
					this.#unsolvedBoard[i][j].val
				)
					return false
			}
		}
		return true
	}

	checkBoard() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.#unsolvedBoard[i][j].isWrong = false
			}
		}
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.checkBox(i, j, this.#unsolvedBoard[i][j].val)
			}
		}
	}

	checkBox(i, j, val) {
		if (val === '') return
		for (let k = 0; k < 9; k++) {
			if (j !== k && this.#unsolvedBoard[i][k].val === val)
				this.glowRow(i)
			if (i !== k && this.#unsolvedBoard[k][j].val === val)
				this.glowCol(j)
		}
		let boxRow = 3 * parseInt(i / 3),
			boxCol = 3 * parseInt(j / 3)
		for (let a = 0; a < 3; a++) {
			for (let b = 0; b < 3; b++) {
				if (
					(boxRow + a !== i || boxCol + b !== j) &&
					this.#unsolvedBoard[boxRow + a][boxCol + b].val === val
				)
					this.glowBox(boxRow, boxCol)
			}
		}
	}

	glowRow(r) {
		for (let i = 0; i < 9; i++) {
			this.#unsolvedBoard[r][i].isWrong = true
		}
	}

	glowCol(c) {
		for (let i = 0; i < 9; i++) {
			this.#unsolvedBoard[i][c].isWrong = true
		}
	}

	glowBox(r, c) {
		for (let a = 0; a < 3; a++) {
			for (let b = 0; b < 3; b++) {
				this.#unsolvedBoard[r + a][c + b].isWrong = true
			}
		}
	}
}

const boardGenerator = new SudokuBoard()

export default boardGenerator
