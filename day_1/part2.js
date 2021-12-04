const getWindowSum = (windowLength, startIndex, data) =>
	data
		.slice(startIndex, startIndex + windowLength)
		.reduce((sum, value) => sum + value, 0);

input.reduce((total, value, index) => {
	return index > 0 && getWindowSum(3, index, input) > getWindowSum(3, index - 1, input)
		? total + 1
		: total;
}, 0);
