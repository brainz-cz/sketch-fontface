const sfnt2woff = require('woff2sfnt-sfnt2woff').toWoff;
var sfnt2woff2 = require('woff2');

//const ttf2woff2 = require('ttf2woff2');
const fs = require("fs");

var file =
	"/Users/ladislavjanecek/Dropbox/BRAINZ\'s\ fonts/BRAINZ\'s\ fonts.rightfontlibrary/fonts/B/Butler\ Stencil\ Bold/Butler_Bold_Stencil.otf";



fs.readFile(file, function(err, fileChunk) {
  fs.writeFileSync("./fffff.woff", sfnt2woff(fileChunk));
	fs.writeFileSync("./fffff.woff2", sfnt2woff2.encode(fileChunk));
});
