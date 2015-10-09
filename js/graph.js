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
    this.medianData = [];
    this.data = _.map(data, function(d) {
      var newData = new BoxData(d);
      newData["height"] = Math.abs(this.yscale(newData["q3Val"]) - this.yscale(newData["q1Val"]));
      newData["width"] = (width/data.length);
      this.medianData.push([{"x": this.xscale(newData.index), "y": this.yscale(newData.q2Val)},
                            {"x": this.xscale(newData.index)+newData.width, "y": this.yscale(newData.q2Val)}]);
      return newData;
    }.bind(this));

    this.whiskerData = this.getWhiskerInstructions(this.data);
    this.svg = d3.select('body').append('svg')
                .attr("width", width)
                .attr("height", height);
    this.buildGraph(this.data, this.medianData, this.whiskerData);
  }

  Graph.prototype.getWhiskerInstructions = function(data) {
    /*
      returns array of arrays
      inner arrays contain objects of
      actual px values for drawing x and y coords
      for all whiskers
    */
    return _.flatten(_.map(data, function(d) {
      return _.map(d.whiskers, function(w) {
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

  Graph.prototype.buildGraph = function(data, medianData, whiskerData) {
    var graph = this;

    this.lineFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .interpolate("linear");

    this.median = this.svg.selectAll(".median")
                       .data(medianData);

    this.median
        .enter()
        .append("path");

    this.median
        .select("path");

    this.median
          .attr("d", function(d) { return graph.lineFunction(d); })
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("fill", "none");

    this.whiskers = this.svg.selectAll(".whiskers")
                       .data(whiskerData);

    this.whiskers
        .enter()
        .append("path");

    this.whiskers
        .select("path");

    this.whiskers
          .attr("d", function(d) { return graph.lineFunction(d); })
          .attr("stroke", "black")
          .attr("stroke-width", 1)
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
      .attr("height", function(d) { return d.height; })
      .style("stroke", "black")
      .style("fill", "none")
      .style("stroke-width", 1);

    this.rects
      .exit()
      .remove();

    this.whiskers
      .exit()
      .remove();

    this.median
      .exit()
      .remove();


  };

  return Graph;
}());
