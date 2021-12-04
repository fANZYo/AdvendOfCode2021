const moves = {
	forward: (amount, position) => ({
		...position,
		horizontal: position.horizontal + amount,
		depth: position.depth + position.aim * amount,
	}),
	up: (amount, position) => ({ ...position, aim: position.aim - amount }),
	down: (amount, position) => ({ ...position, aim: position.aim + amount }),
};

const finalPosition = input.reduce((position, moveSet) => {
	const [move, amount] = moveSet.split(' ');

	return moves[move](Number(amount), position);
}, {
	aim: 0,
	horizontal: 0,
	depth: 0,
});

const result = finalPosition.horizontal * finalPosition.depth;
