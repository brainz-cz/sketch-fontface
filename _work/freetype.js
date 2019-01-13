var fs = require("fs"),
	ft = require("freetype2");

var file =
	"/Users/ladislavjanecek/Dropbox/BRAINZ's fonts/BRAINZ's fonts.rightfontlibrary/fonts/B/Butler Stencil Bold/Butler_Bold_Stencil.otf";

fs.readFile(file, function(err, buffer) {

	if (!!err) throw err;

	var face = {};


	var err = ft.Load_Glyph(buffer, 0, face);



	if (!err) {
		face = face;
		console.log(face);
	}
});
