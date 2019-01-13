var Fontmin = require('fontmin');

var file =
	"/Users/ladislavjanecek/Dropbox/BRAINZ\'s\ fonts/BRAINZ\'s\ fonts.rightfontlibrary/fonts/B/Butler\ Stencil\ Bold/Butler_Bold_Stencil.otf";


var fontmin = new Fontmin()
    .src(file)
    .use(Fontmin.otf2ttf())
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    .dest('./')


fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});
