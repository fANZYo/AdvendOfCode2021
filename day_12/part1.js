const input = require('./input.json');

const graph = input.reduce((graph, connection) => {
	const [a, b] = connection.split('-');

	return {
		...graph,
		[a]: (graph[a] || []).concat(b),
		[b]: (graph[b] || []).concat(a),
	};
}, {});

const queue = [['start']];
const paths = [];

while(queue.length) {
	const path = queue.shift();
	const node = path[path.length - 1];

	if (node === 'end') {
		paths.push(path);
	}

	for (child of graph[node]) {
		if (!path.includes(child) || child.toLowerCase() !== child) {
			queue.push(path.slice().concat(child));
		}
	}
}
console.log(paths.length);
