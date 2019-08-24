export const catched = async (promise, err) => {
	if (!(promise instanceof Promise)) throw new Error('TypeError: Expected a promise as first argument');

	try {
		const res = await promise();
		return res;
	} catch (e) {
		if (typeof err === 'function') err(e);
		else if (typeof err === 'string' || typeof err === 'object') throw err;
		else throw e;

		return null;
	}
};
