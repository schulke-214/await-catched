const { catched } = require('../dist/await-catched.cjs');

const { willWork, willFail } = require('./_helper');

(async () => {
	await catched(willWork(), e => {
		console.log('this will never run :)');
	});

	await catched(willFail(), e => {
		console.log('something went wrong..');
	});
})();
