var phantom = require('phantom');
var fs = require('fs');

function convertFile() {
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open("template.html", function (status) {
	    	page.injectJs('script.js', function() {
		      page.evaluate(function() {
		      	var node = document.getElementById('chart');
		      	node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
						var nodeInformation = new XMLSerializer().serializeToString(node);
		      	return nodeInformation;
		      }, function (result) {
		      	createSVGFile(result);
		        ph.exit();
		      });
	    	})
	    });
	  });
	});
}

function createSVGFile(svgNodeData) {
	var header1 = '<?xml version="1.0" standalone="no"?>';
	var header2 = '<?xml-stylesheet href="plottable.css" type="text/css"?>';
	var content = header1 + "\n" + header2 + "\n" + svgNodeData + "\n";
	fs.writeFile('./output.svg', content, function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
	})
}

function loadScript(scriptName) {
	fs.readFile(scriptName, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  console.log(data);
	});
}


function start() {
	convertFile();
	// loadScript('script.js')
}


start();