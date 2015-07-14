var fs = require('fs');
var minimist = require('minimist');
var phantom = require('phantom');
var path = require('path');

var _dataFile;
var _configFile;
var _outputFile;
var _svgHeight;
var _svgWidth;
var _templateFile = 'template.html';
var _readmeFile = 'README.md';
var _plottableCSS = 'bower_components/plottable/plottable.css';

function createPlotAndExtractSVG() {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open(_templateFile, function(status) {
        if (status !== "success") {
          throw new Error("Could not find file " + _templateFile);
        }
        _prepareSVG(page);
        _runPlottable(page);
        _extractSVG(page);
        ph.exit();
      });
    });
  });
}

function _prepareSVG(page) {
  page.evaluate(function(height, width) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "svg";
    svg.setAttribute("height", height);
    svg.setAttribute("width", width);
    document.body.appendChild(svg);
  }, function() {
  }, _svgHeight, _svgWidth);
}

function _runPlottable(page) {
  _dataFile && page.injectJs(_dataFile, function(success) {
    if (!success) {
      throw new Error("Could not find file " + data_file);
    }
  });
  _configFile && page.injectJs(_configFile, function(success) {
    if (!success) {
      throw new Error("Could not find file " + _configFile);
    }
  });
}

function _extractSVG(page) {
  page.evaluate(function() {
    var node = document.getElementById('svg');
    node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = new XMLSerializer().serializeToString(node);
    return svgData;
  }, function (svgData) {
    createSVGFile(svgData);
  });
}

function createSVGFile(svgNodeData) {
  var header = '<?xml version="1.0" standalone="no"?>';
  generateCSS(function(cssContent){
    cssInjectedSvgNodeData = svgNodeData.replace("</svg>", cssContent + "</svg>")
    var content = header + cssInjectedSvgNodeData + "\n" ;
    fs.writeFile(_outputFile, content, function (err, data) {
      if (err) {
        throw new Error(err);
      }
    })
  })
}

function _loadFile(file, callback) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

function generateCSS(callback) {
  _loadFile(_plottableCSS, function(stylesheet) {
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

function processArguments() {
  var args = minimist(process.argv.slice(2), {
    boolean: ["help", "version"],
    alias: {
      d: "data",
      o: "output",
      h: "height",
      w: "width",
    }
  });

  if (args.help) {
    showHelp();
  }

  if (args.version) {
    console.log("v" + require('./package.json').version);
    process.exit();
  }

  _dataFile = args.data || null;
  _configFile = args._[0] || null;
  _outputFile = args.output || "output.svg";
  _svgHeight = args.height || 500;
  _svgWidth = args.width || 500;

  if (_configFile == null) {
    showHelp();
  }
}

function showHelp() {
  var cmd = path.basename(process.argv[1]);
  var help = fs
    .readFileSync(__dirname + '/' + _readmeFile , 'utf-8')
    .match(/```help([^`]*)```/)[1]
    .replace(/\$0/g, cmd)
    .trim()
  console.log(help);
  process.exit(1);
}

function start() {
  processArguments();
  createPlotAndExtractSVG();
}

start();
