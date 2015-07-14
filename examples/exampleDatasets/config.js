var xScale = new Plottable.Scales.Linear();
var yScale = new Plottable.Scales.Linear();
var colorScale = new Plottable.Scales.Color();

var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
var yAxis = new Plottable.Axes.Numeric(yScale, "left");

var plot = new Plottable.Plots.StackedBar();
plot.x(function(d) {return d.x }, xScale)
plot.y(function(d) {return d.y }, yScale)
plot.attr("fill", function(d) {return d.type}, colorScale)

var datasets = data.map(function(d) { return new Plottable.Dataset(d);})
plot.datasets(datasets);

var legend = new Plottable.Components.Legend(colorScale);

var table = new Plottable.Components.Table([
  [yAxis, plot, legend],
  [null, xAxis, null]
]);

table.renderTo("#svg");
