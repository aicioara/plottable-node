var _datasets = 10;
var _categories = 20;

var template = Array.apply(null, Array(_categories)).map(function(d, i) {
	return {
		x: i,
		y: i,
		type: 0
	}
});

var data = Array.apply(null, Array(_datasets)).map(function(d, i) {
	return template.map(function(d) {
	  return {
	  	x: d.x,
	  	y: d.y,
	  	type: i.toString()
	  }
	});
});
