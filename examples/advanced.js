const { catched } = require('../dist/await-catched.cjs');

const action = async num => {
	await new Promise((resolve, reject) => {
		if (num > 3) reject(num);

		setTimeout(() => resolve, 2000);
	});

	console.log('ACTION HAPPENED', num);

	return num;
};

(async () => {
	const errorHandler = e => {
		console.log('ACTION FAILED:', e);
	};

	await catched(action(54), errorHandler);
	await catched(action(5), errorHandler);
	await catched(action(2), errorHandler);
})();
