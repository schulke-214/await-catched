const isPromiseArray = arr => {
	const isArr = Array.isArray(arr);

	if (!isArr) return false;

	return arr.every(el => el instanceof Promise);
};

export const catched = async (targets, handler) => {
	const single = targets instanceof Promise;
	const multiple = isPromiseArray(targets);

	if (!single && !multiple)
		throw new TypeError('Expected a single promise or an array of promises as first argument');
	if (handler && typeof handler !== 'function')
		throw new TypeError('Expected a error handler function as second argument');

	try {
		const res = single ? await targets : await Promise.all(targets);

		return res;
	} catch (e) {
		if (handler) handler(e);
		return null;
	}
};
