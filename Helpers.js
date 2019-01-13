module.exports = {

  slugify: function(text) {
  	return text
  		.toString()
  		.toLowerCase()
  		.replace(/\s+/g, "-")
  		.replace(/[^\w\-]+/g, "")
  		.replace(/\-\-+/g, "-")
  		.replace(/^-+/, "")
  		.replace(/-+$/, "");
  }
};
