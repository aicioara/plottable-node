# Command line charts with PlottableJS

## Overview 
Tool to be used for generating SVG and PNG plots using [PlottableJS](https://github.com/palantir/plottable). 

## Installation
- Install NodeJS
- Install global dependencies `npm install bower phantomjs -g`
- Install node modules `npm install`
- Install library dependencies `bower install`

## Usage
Simple
```
node plottable-node.js example.js
```
Configured
```
node plottable-node.js -h 500 -w 500 -o plot.svg example.js
```

## PNG conversion
We do not officially support PNG conversion, but we provide a neat tool for executing the conversion (MAC only)
- One file conversion `bash svgToPng.sh file.svg` -> `file.svg.png`

## Help
```help
Usage:
    $0 [options] configFile

Options:
    -d, --data         JavaScript data file
    -o, --output       name of the output SVG file (defaults to output.svg)
    -h, --height       width of the SVG in pixels
    -w, --width        height of the SVG in pixels
    -v, --version      show version info and exit
    --help             print usage information
```

## Develop
For feature requests please open an issue. Pull requests welcome.

## License
MIT
