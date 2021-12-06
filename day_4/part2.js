let boards = input.boards.map((board) => board.map((row) => row.map((field) => ({
	marked: false,
	number: field,
}))));

const getRotatedBoard = (board) => board.map((row, rowIndex) => row.map((_, columnIndex) => board[columnIndex][rowIndex]));
const getCompleteRow = (board) => board.find((row) => row.every((field) => field.marked === true));
const getCompleteColumn = (board) => getCompleteRow(getRotatedBoard(board));
const isWinningBoard = (board) => getCompleteRow(board) || getCompleteColumn(board);
const getFieldByNumber = (board, number) => board.flat().find((field) => field.number === number);

let winningBoard = null;
let lastCall = null;
input.calls.forEach((call) => {
	if (boards.length === 1 && lastCall === null) {
		lastCall = call;
	}

	boards = boards.filter((board, index) => {
		const calledField = getFieldByNumber(board, call);

		calledField && ( calledField.marked = true );

		if (isWinningBoard(board)) {
			winningBoard = board;
			return false;
		}
		return true;
	});
});

const unmarkedSum = winningBoard.flat().reduce((sum, field) => sum + (field.marked === false ? field.number : 0), 0);
const result = unmarkedSum * lastCall;
