const moves = {
	forward: (amount, position) => ({ ...position, horizontal: position.horizontal + amount }),
	up: (amount, position) => ({ ...position, depth: position.depth - amount }),
	down: (amount, position) => ({ ...position, depth: position.depth + amount }),
};

const finalPosition = input.reduce((position, moveSet) => {
	const [move, amount] = moveSet.split(' ');

	return moves[move](Number(amount), position);
}, {
	horizontal: 0,
	depth: 0,
});

const result = finalPosition.horizontal * finalPosition.depth;
