const fs = require("fs");
var Font = require("fonteditor-core").Font;

const types = require("./Types");

// const otf2ttf = require('otf2ttf');
// const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

var file =
	"/Users/ladislavjanecek/Dropbox/BRAINZ\'s\ fonts/BRAINZ\'s\ fonts.rightfontlibrary/fonts/B/Butler\ Stencil\ Bold/Butler_Bold_Stencil.otf";

fs.readFile(file, function(err, fileChunk) {

	var font = Font.create(fileChunk, {
		type: types(fileChunk).ext,
	});

	console.log(font.data.glyf.length);

	var woffBuffer = font.write({
		type: "woff",
    subset: [207, 356, 352]
	});


  var ttfBuffer = font.write({
		type: "ttf",
    subset: [207, 356, 352]
	});

  fs.writeFileSync('./fontc.woff2', ttf2woff2(ttfBuffer));
	fs.writeFileSync("./fontc.woff", woffBuffer);



  var result = font.find({
    unicode: [352]
  });

  console.log(result);
});
