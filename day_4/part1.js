const boards = input.boards.map((board) => board.map((row) => row.map((field) => ({
	marked: false,
	number: field,
}))));

const getRotatedBoard = (board) => board.map((row, rowIndex) => row.map((_, columnIndex) => board[columnIndex][rowIndex]));
const getCompleteRow = (board) => board.find((row) => row.every((field) => field.marked === true));
const getCompleteColumn = (board) => getCompleteRow(getRotatedBoard(board));
const isWinningBoard = (board) => getCompleteRow(board) || getCompleteColumn(board);
const getFieldByNumber = (board, number) => board.flat().find((field) => field.number === number);

let winningBoard = null;
const lastCall = input.calls.find((call) => {
	winningBoard = boards.find((board) => {
		const calledField = getFieldByNumber(board, call);

		calledField && ( calledField.marked = true );

		return isWinningBoard(board);
	});

	return !!winningBoard;
});

const unmarkedSum = winningBoard.flat().reduce((sum, field) => sum + (field.marked === false ? field.number : 0), 0);
const result = unmarkedSum * lastCall;
