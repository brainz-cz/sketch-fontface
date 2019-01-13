const fs = require("fs");

const async = require("async");
const fontManager = require("font-manager");

const Helpers = require("./Helpers");
const Reader = require("./Reader");
const Template = require("./Template");
const Convert = require("./Convert");
const Types = require('./Types');

var file = "/Users/ladislavjanecek/Documents/zl-web-v1.sketch";

Reader.read(file).then(sketch => {
	//console.log(sketch);

	var fonts = sketch[2].fonts.reduce((result, font) => {
		var fontList = fontManager.findFontsSync({postscriptName: font});
		var fontItem = fontList[0];
		if (fontItem)
			var ext = Types(fontItem.path).ext
			if(ext == 'ttf' || ext == 'otf')
				result.push({
					name: Helpers.slugify(`${fontItem.family}-${fontItem.style}`),
					dest: "./data",
					...fontItem
				});

		return result;
	}, []);

	async.times(
		fonts.length,
		function(n, next) {
			Convert.convert(fonts[n].path, fonts[n].dest, fonts[n].name, function() {
				next();
			});
		},
		function() {
			Template.generate(fonts);

			console.log("done");
		}
	);

	//console.log(sketch[2].fonts);
	//console.log(sketch[1].assets.colors);
});
