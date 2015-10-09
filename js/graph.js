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
    extend(Graph, new GraphData( height, width, data, vertical));
    this.data = _.map(data, function(d) {
      return new BoxData(d);
    });
    this.svg = d3.select('body').append('svg')
                .attr("width", width)
                .attr("height", height);
    this.buildGraph(this.data);
  }


  Graph.prototype.buildGraph = function(data) {
    var graph = this;

    this.boxes = this.svg.append("g");

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
        return graph.yscale(calculations.mean(d.indxToVal(d.q1, d.data))) - 200;
      })
      .attr("width", 200)
      .attr("height", 200);

    this.rects
      .exit()
      .remove();

  };

  return Graph;
}());
