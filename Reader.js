const fs = require("fs");
const JSZip = require("jszip");

exports.read = function(file) {
	if (Array.isArray(file)) {
		return Promise.all(file.map(each => read(each)));
	}

	return JSZip.loadAsync(fs.readFileSync(file))
		.then(zip => {
			return Promise.all([
				zip.file("document.json").async("string"),
				zip.file("meta.json").async("string"),
				zip.file("user.json").async("string")
			]).then(result => {
				return {
					repo: zip,
					document: JSON.parse(result[0]),
					meta: JSON.parse(result[1]),
					user: JSON.parse(result[2])
				};
			});
		})
		.then(data => {
			return Promise.all(
				data.document.pages.map(page => {
					return data.repo.file(`${page._ref}.json`).async("string");
				})
			).then(pages => {
				data.pages = pages.map(page => JSON.parse(page));
				return data;
			});
		})
		.then(data => {
			return [data.repo, data.document, data.meta, data.user, data.pages];
		});
};
