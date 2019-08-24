const isPromiseArray = arr => {
	const isArr = Array.isArray(arr);

	if (!isArr) return false;

	return arr.every(el => el instanceof Promise);
};

const defaultOptions = {
	quiet: false
};

export const catched = async (target, handler, options = defaultOptions) => {
	const single = target instanceof Promise;
	const multiple = isPromiseArray(target);

	if (!single && !multiple)
		throw new TypeError('Expected a single promise or an array of promises as first argument');
	if (handler && typeof handler !== 'function')
		throw new TypeError('Expected a error handler function as second argument');

	try {
		let res;

		if (single) {
			res = await target;
		} else {
			res = await Promise.all(target);
		}

		return res;
	} catch (e) {
		if (handler) handler(e);
		else if (!options.quiet) {
			console.warn('catched: found an unhandled exception');
		}

		return null;
	}
};
