const fs = require("fs");

const sfnt2woff = require('woff2sfnt-sfnt2woff').toWoff;
const sfnt2woff2 = require('woff2');

exports.convert = function (sfnt, dest, name, next) {

  fs.readFile(sfnt, function(err, fileChunk) {

    fs.writeFileSync(`${dest}/${name}.woff`, sfnt2woff(fileChunk));
  	fs.writeFileSync(`${dest}/${name}.woff2`, sfnt2woff2.encode(fileChunk));

    next()

  });
};
