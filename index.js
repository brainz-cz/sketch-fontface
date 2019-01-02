const fs = require('fs');
const JSZip = require('jszip');
const namer = require('color-namer');
const fontManager = require('font-manager');


function read(file) {

	if (Array.isArray(file)) {
		return Promise.all(file.map(each => read(each)));
	}

	return JSZip.loadAsync(fs.readFileSync(file))
		.then(zip => {
			return Promise.all([
				zip.file('document.json').async('string'),
				zip.file('meta.json').async('string'),
				zip.file('user.json').async('string')
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
					return data.repo.file(`${page._ref}.json`).async('string');
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

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


var file = '/Users/ladislavjanecek/Documents/zl-web-v1.sketch';

function getFontFace(font){

    var name = slugify(font.family);
    var path = 'nejakacesta';

    var fontFaceTemplate = `@font-face {
        font-family: '${name}';
        src: url('${path}/${name}.woff2') format('woff2'),
             url('${path}/${name}.woff') format('woff');
        font-weight: ${font.weight};
        font-style: ${font.italic ? 'italic' : 'normal'};
    }`;

    return fontFaceTemplate
}

read(file).then(sketch => {

    console.log(sketch[2].fonts);

    sketch[2].fonts.forEach((font) => {

        fontManager.findFonts({ postscriptName: font}, function(fonts) {

            if(fonts[0])
                console.log(getFontFace(fonts[0]));
        });
    })



    sketch[1].assets.colors.forEach((data) => {

        var rgba = `rgba(${data.red * 100},${data.green * 100},${data.blue * 100},${data.alpha})`;
        var rgb = data.blue * 100 | (data.green * 100 << 8) | (data.red * 100 << 16);
        var hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
        var color = data.alpha < 1 ? rgba : hex;

        var name = slugify(namer(color).ntc[0].name)

        console.log(`$${name}:`, color);
	})
});
