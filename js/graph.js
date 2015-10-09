var GraphData = require('./graphdata');
var extend = require('./extends');
var calculations = require('./calculations');
var BoxData = require('./boxdata');
var Box = require('./box');
var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

module.exports = (function() {
  function Graph(height, width, data, vertical) {
    extend(Graph, [new GraphData( height, width, data, vertical)]);
    this.data = _.map(data, function(d) {
      var newData = new BoxData(d);
      newData["height"] = Math.abs(this.yscale(newData["q3Val"]) - this.yscale(newData["q1Val"]));
      newData["width"] = (width/data.length);
      return newData;
    }.bind(this));

    this.whiskerData = this.getWhiskerInstructions(this.data);
    this.svg = d3.select('body').append('svg')
                .attr("width", width)
                .attr("height", height);
    this.buildGraph(this.data);
  }

  Graph.prototype.getWhiskerInstructions = function(data) {
    return _.flatten(_.map(data, function(d) {
      return _.map(d.whiskers, function(w) {
        //return array of objects with actual px data points
        //get value of innerindexes and their means
        return [{"y": this.yscale(calculations.mean(d.indxToVal(w.innerInd, d.data))),
                "x": this.xscale(d.index) + d.width/2},
                {"y": this.yscale(d.data[w.outerInd]),
                "x": this.xscale(d.index) + d.width/2},
                {"y": this.yscale(d.data[w.outerInd]),
                  "x": this.xscale(d.index) + d.width/2 - 5},
                {"y": this.yscale(d.data[w.outerInd]),
                  "x": this.xscale(d.index) + d.width/2 + 5}];
        }.bind(this));
    }.bind(this)));
  };

  Graph.prototype.buildGraph = function(data) {
    var graph = this;

    this.boxes = this.svg.append("g");

    this.whiskerFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .interpolate("linear");

    this.whiskers = this.svg.selectAll("path")
                       .data(this.whiskerData);

    this.whiskers
        .enter()
        .append("path");

    this.whiskers
        .select("path");

    this.whiskers
          .attr("d", function(d) { return graph.whiskerFunction(d); })
          .attr("stroke", "blue")
          .attr("stroke-width", 2)
          .attr("fill", "none");

    this.rects = this.svg.selectAll("rect")
                             .data(data);
    this.rects
        .enter()
        .append("rect");

    this.rects
      .select("rect");

    this.rects
      .attr("x", function(d) {
        return graph.xscale(d.index);
      })
      .attr("y", function(d) {
        return graph.yscale(calculations.mean(d.indxToVal(d.q1, d.data))) - d.height;
      })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; });

    this.rects
      .exit()
      .remove();

  };

  return Graph;
}());
