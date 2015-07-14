# plottable-node

## Installation & Prerequisites 
- Install NodeJS
- `npm install -g bower`
- `npm install -g phantomjs`

```
npm install
bower install
```

## Usage
Simple
```
node plottable-node.js example.js
```
More configuration
```
node plottable-node.js -h 500 -w 500 -o plot.svg example.js
```


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


## License
MIT
