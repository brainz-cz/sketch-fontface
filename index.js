const fs = require("fs");

const async = require("async");
const fontManager = require("font-manager");

const Helpers = require("./Helpers");
const Reader = require("./Reader");
const Template = require("./Template");
const Convert = require("./Convert");

var file = "/Users/ladislavjanecek/Documents/zl-web-v1.sketch";

Reader.read(file).then(sketch => {
	//console.log(sketch);

	var fonts = [
		{
			name: "some",
			source: "/Users/ladislavjanecek/Dropbox/BRAINZ's fonts/BRAINZ's fonts.rightfontlibrary/fonts/B/Butler Stencil Bold/Butler_Bold_Stencil.otf",
			dest: "./data",
			weight: 200,
			italic: true
		},
		{
			name: "some2",
			source: "/Users/ladislavjanecek/Dropbox/BRAINZ's fonts/BRAINZ's fonts.rightfontlibrary/fonts/B/Butler Stencil Bold/Butler_Bold_Stencil.otf",
			dest: "./data",
			weight: 400,
			italic: false
		}
	];

	async.times(
		fonts.length,
		function(n, next) {
			Convert.convert(fonts[n].source, fonts[n].dest, fonts[n].name, function() {
				next()
			});
		},
		function() {
			Template.generate(fonts);
		}
	);

	// fontManager.findFonts({postscriptName: font}, function(fontFamilies) {
	//
	// 	if (fontFamilies[0]) {
	// 		fontFamilies[0]["filename"] = slugify(fontFamilies[0].postscriptName);
	// 		fontFamilies[0]["mimetype"] = mime.lookup(fontFamilies[0].path);
	// 		_fonts.push(fontFamilies[0]);
	// 	}
	//
	// 	callback();
	// });

	console.log(sketch[2].fonts);
	console.log(sketch[1].assets.colors);
});
