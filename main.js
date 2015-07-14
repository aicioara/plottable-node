var phantom = require('phantom');
var fs = require('fs');

function convertFile() {
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open("template.html", function (status) {
	    	page.injectJs('script.js', function() {
		      page.evaluate(function() {
		      	var node = document.getElementById('svg');
		      	node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
						var svgData = new XMLSerializer().serializeToString(node);
		      	return svgData;
		      }, function (svgData) {
		      	createSVGFile(svgData);
		        ph.exit();
		      });
	    	})
	    });
	  });
	});
}

function createSVGFile(svgNodeData) {
	var header1 = '<?xml version="1.0" standalone="no"?>';
	loadCSS(function(cssContent){
		svgNodeData = svgNodeData.replace("</svg>", cssContent + "</svg>")
		var content = header1 + svgNodeData + "\n" ;
		fs.writeFile('./output.svg', content, function (err, data) {
			if (err) {
				return console.log(err);
			}
		})
	})
}

function loadFile(scriptName, callback) {
	fs.readFile(scriptName, 'utf8', function (err, data) {
	  if (err) {
	    return console.log(err);
	  }
	  callback(data);
	});
}

function loadCSS(callback) {
	loadFile('bower_components/plottable/plottable.css', function(stylesheet) {
		var injection = "<defs>"
		injection += '<style type="text/css">'
		injection += '<![CDATA[';
		injection += stylesheet;
		injection += ']]>'
		injection += '</style>';
		injection += '</defs>';
		callback(injection);
	});
}


function start() {
	convertFile();
}


start();