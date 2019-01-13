const namer = require("color-namer");
const Helpers = require('./Helpers');

exports.functionName = function(colors) {

	var variables = [];

	colors.forEach(data => {

		var red = Math.round(data.red * 100);
		var green = Math.round(data.green * 100);
		var blue = Math.round(data.blue * 100);

		var rgba = `rgba(${red},${green},${blue},${data.alpha})`;

		var rgb = blue | (green << 8) | (red << 16);
		var hex = "#" + (0x1000000 + rgb).toString(16).slice(1);
		var color = data.alpha < 1 ? rgba : hex;

		var name = Helpers.slugify(namer(color).ntc[0].name);

		variables.push(`$${name}: ${color}`);
	});

	return variables;
};
