const getMostCommonBit = (position, binaries) => {
	const onesCount = binaries.filter((binary) => binary[position] === '1').length;

	return onesCount >= binaries.length - onesCount
		? 1
		: 0;
};

const getO2Rating = (binaries, position) => {
	if (binaries.length <= 1) {
		return parseInt(binaries[0], 2);
	}

	const mostCommonBit = getMostCommonBit(position, binaries);
	return getO2Rating(binaries.filter((binary) => binary[position] === String(mostCommonBit)), position + 1);
};

const getCO2Rating = (binaries, position) => {
	if (binaries.length <= 1) {
		return parseInt(binaries[0], 2);
	}

	const leastCommonBit = getMostCommonBit(position, binaries) === 1 ? 0 : 1;
	return getCO2Rating(binaries.filter((binary) => binary[position] === String(leastCommonBit)), position + 1);
};

const result = getO2Rating(input, 0) * getCO2Rating(input, 0);
