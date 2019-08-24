module.exports.willFail = async payload => {
	return new Promise((_, reject) => setTimeout(reject, 2000));
};

module.exports.willWork = async payload => {
	return new Promise((resolve, _) => setTimeout(resolve, 2000, payload));
};
