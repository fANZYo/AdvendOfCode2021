const input = require('./input.json');

const graph = input.reduce((graph, connection) => {
	const parts = connection.split('-');

	return {
		...graph,
		[parts[0]]: (graph[parts[0]] || []).concat(parts[1]),
		[parts[1]]: (graph[parts[1]] || []).concat(parts[0]),
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
