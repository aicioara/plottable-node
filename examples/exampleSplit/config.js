var xScale = new Plottable.Scales.Linear();
var yScale = new Plottable.Scales.Linear();

var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
var yAxis = new Plottable.Axes.Numeric(yScale, "left");

var plot = new Plottable.Plots.Scatter();
plot.x(function(d) { return d.x }, xScale);
plot.y(function(d) { return d.y }, yScale);
plot.addDataset(new Plottable.Dataset(data));

var table = new Plottable.Components.Table([
	[yAxis, plot],
	[null, xAxis]
]);

table.renderTo("#svg")
