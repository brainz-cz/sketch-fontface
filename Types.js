const fileType = require('file-type');

const fontExts = new Set([
	'eot',
	'otf',
	'ttf',
	'woff',
	'woff2'
]);

module.exports = fileChunk => {
	const info = fileType(fileChunk);
	return fontExts.has(info && info.ext) ? info : false;
};
