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
      //add height, width, to data obj
      //get means of q3 and q1, then use yscale to get height
      //widht is width of graph/length data
      //
      newData["height"] = Math.abs(this.yscale(newData["q3Val"]) - this.yscale(newData["q1Val"]));
      newData["width"] = (width/data.length) - 5;
      return newData;
    }.bind(this));
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
