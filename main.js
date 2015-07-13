var phantom = require('phantom');
var fs = require('fs');


createSVGFile("Hello");

phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://localhost:8000", function (status) {
      page.evaluate(function () {
      	var node = document.getElementById('chart')
				var nodeInformation = new XMLSerializer().serializeToString(node);
      	return nodeInformation;
      }, function (result) {
      	createSVGFile(result);
        ph.exit();
      });
    });
  });
});

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