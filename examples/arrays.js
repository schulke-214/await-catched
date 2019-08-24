const { catched } = require('../dist');

const { willWork, willFail } = require('./_helper');

(async () => {
	const results = await catched([willWork(1), willWork(true), willWork(21)], e => {
		console.error('something went wrong..');
	});

	console.log(results); // outputs [ 1, true, 21 ]
})();
