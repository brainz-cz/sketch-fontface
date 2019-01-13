const fs = require('fs');

var SFNTParser = require("sfnt-parser");

var file =
	"/Users/ladislavjanecek/Dropbox/BRAINZ\'s\ fonts/BRAINZ\'s\ fonts.rightfontlibrary/fonts/B/Butler\ Stencil\ Bold/Butler_Bold_Stencil.otf";


var plugins = [SFNTParser.plugins.cff];

var font = SFNTParser.parseBuffer(fs.readFileSync(file), plugins);

console.log(font);
