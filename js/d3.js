
var data = [
  { name: "HSL Rainbow", labelOffset: 60, value: function (t) { return d3.hsl(t, 1, 0.5); } },
  { name: "HCL Rainbow", labelOffset: 20, value: function (t) { return d3.hcl(t, 1, 0.5); } },
  { name: "Cubehelix Rainbow", labelOffset: 40, value: d3.scaleRainbow().domain([0, 360]) }
].map(function (color) {
  return color.deltas = d3.range(0, 360, 3).map(function (x) {
    return {
      input: x,
      delta: delta(color.value(x - 10), color.value(x + 10))
    };
  }), color;
});

var margin = { top: 20, right: 20, bottom: 30, left: 30 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .domain([0, 360])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([0, 80])
  .range([height, 0]);

var z = d3.scaleCategory10();

var line = d3.line()
  .curve(d3.curveBasis)
  .x(function (d) { return x(d.input); })
  .y(function (d) { return y(d.delta); });

var svg = d3.select("#d3example").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + y(0) + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y))
  .selectAll(".tick:last-of-type")
  .append("text")
  .attr("class", "axis-title")
  .attr("x", 3)
  .attr("dy", ".32em")
  .text("Color Difference at ±10° (CIE76)");

var g = svg.selectAll(".line")
  .data(data)
  .enter().append("g")
  .attr("class", "line");

g.append("path")
  .attr("d", function (d) { return line(d.deltas); })
  .attr("id", function (d, i) { return "path-" + i; })
  .style("stroke", function (d, i) { return z(i); });

g.append("text")
  .attr("x", function (d) { return d.labelOffset; })
  .attr("dy", -5)
  .style("fill", function (d, i) { return d3.lab(z(i)).darker(); })
  .append("textPath")
  .attr("class", "textpath")
  .attr("xlink:href", function (d, i) { return "#path-" + i; })
  .text(function (d) { return d.name; });

// CIE76 per https://en.wikipedia.org/wiki/Color_difference#CIE76
// Not as good as CIEDE2000 but a lot easier to implement.
function delta(a, b) {
  var dl = (a = d3.lab(a)).l - (b = d3.lab(b)).l, da = a.a - b.a, db = a.b - b.b;
  return Math.sqrt(dl * dl + da * da + db * db);
}


var parseDate = d3.timeParse("%m/%d/%Y %H:%M:%S %p"),
  formatCount = d3.format(",.0f");

var margin = { top: 10, right: 30, bottom: 30, left: 30 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleTime()
  .domain([new Date(2015, 0, 1), new Date(2016, 0, 1)])
  .rangeRound([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var histogram = d3.histogram()
  .value(function (d) { return d.date; })
  .domain(x.domain())
  .thresholds(x.ticks(d3.timeWeek));

var svg = d3
  .select("#d3example2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

d3.csv("data2.csv", type, function(error, data) {
  if (error) throw error;

  var bins = histogram(data);

  y.domain([
    0,
    d3.max(bins, function(d) {
      return d.length;
    })
  ]);

  var bar = svg
    .selectAll(".bar")
    .data(bins)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", function(d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    });

  bar
    .append("rect")
    .attr("x", 1)
    .attr("width", function(d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function(d) {
      return height - y(d.length);
    });

  bar
    .append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", function(d) {
      return (x(d.x1) - x(d.x0)) / 2;
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatCount(d.length);
    });
});

function type(d) {
  d.date = parseDate(d.date);
  return d;
}