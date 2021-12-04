input.reduce((total, value, index) => {
	return index > 0 && Number(value) > Number(input[index - 1])
		? total + 1
		: total;
}, 0);
