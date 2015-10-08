var GraphData = require('./graphdata');
var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

module.exports = (function() {
  function Graph(height, width, data, vertical) {
    var gd = new GraphData(height, width, data, vertical);
    this.xscale = gd.xscale;
    this.yscale = gd.xscale;
    this.svg = d3.select('body').append('svg')
                .attr("width", width)
                .attr("height", height);
    this.buildBoxes(data);
  }

  Graph.prototype.buildBoxes = function(data) {
    var graph = this;
    this.boxes = this.svg.selectAll("circle")
                                  .data(data);
    this.boxes
        .enter()
        .append("circle");

    this.boxes
      .select("circle");

    this.boxes
      .attr("cx", function(d) { return graph.xscale(d.index); })
      .attr("cy", 200)
      .attr("r", 20);

    this.boxes
      .exit()
      .remove();

  };

  return Graph;
}());
