const fs = require("fs");
const JSZip = require("jszip");
const namer = require("color-namer");
const fontManager = require("font-manager");
const async = require("async");

var file = "/Users/ladislavjanecek/Documents/zl-web-v1.sketch";

function read(file) {
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
}

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

function getFontFace(fonts, next) {

	var _fonts = []
	var fontFaces = []

	async.each(
		fonts,
		function(font, callback) {
			fontManager.findFonts({postscriptName: font}, function(fontFamilies) {
				if (fontFamilies[0])
					_fonts.push(fontFamilies[0])
					callback();
			});
		},
		function() {

			_fonts.forEach(fontFamily => {

				var name = slugify(fontFamily.family);
				var path = "nejakacesta";

				var fontFaceTemplate = `@font-face {
			        font-family: '${name}';
			        src: url('${path}/${name}.woff2') format('woff2'),
			             url('${path}/${name}.woff') format('woff');
			        font-weight: ${fontFamily.weight};
			        font-style: ${fontFamily.italic ? "italic" : "normal"};
				}`;

				console.log(fontFaceTemplate);

				fontFaces.push(fontFaceTemplate)
				next(fontFaces);

			})
		}
	);
}

function getColorVariables(colors, next) {
	var variables = [];

	colors.forEach(data => {
		var rgba = `rgba(${data.red * 100},${data.green * 100},${data.blue * 100},${
			data.alpha
		})`;

		var rgb =
			(data.blue * 100) | ((data.green * 100) << 8) | ((data.red * 100) << 16);
		var hex = "#" + (0x1000000 + rgb).toString(16).slice(1);
		var color = data.alpha < 1 ? rgba : hex;

		var name = slugify(namer(color).ntc[0].name);

		variables.push(`$${name}: ${color}`);
	});

	next(variables);
}

read(file).then(sketch => {
	console.log(sketch[2].fonts);

	getFontFace(sketch[2].fonts, function(data) {
		//console.log(data);
	});

	getColorVariables(sketch[1].assets.colors, function(data) {
		console.log(data);
	});
});
