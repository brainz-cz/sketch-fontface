const ejs = require('ejs');
const fs = require('fs');

exports.generate = function (data) {

  var config = fs.readFileSync('./fonts.css.ejs', 'utf-8')
  var configRender = ejs.render(config, {fonts: data})

  fs.writeFileSync('./data/fonts.css', configRender)

};
