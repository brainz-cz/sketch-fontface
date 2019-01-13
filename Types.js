const fileType = require('file-type');
const fs = require('fs');

const fontExts = new Set([
	'eot',
	'otf',
	'ttf',
	'woff',
	'woff2'
]);

module.exports = path => {
	const info = fileType(fs.readFileSync(path));
	return fontExts.has(info && info.ext) ? info : false;
};
