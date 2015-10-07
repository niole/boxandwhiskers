var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

module.exports = (function() {
  function GraphData(height, width, nplots, maxval, vertical) {
    if (vertical) {
      this.setyscale(maxval, height);
      this.setxscale(nplots, width);
    } else {
      this.setyscale(nplots, height);
      this.setxscale(maxval, width);
    }
  }

  GraphData.prototype.setyscale = function(maxval, height) {
    this.yscale = d3.scale.linear()
                  .domain([0, maxval])
                  .range([height, 0]);
  };

  GraphData.prototype.setxscale = function(maxval, width) {
    this.xscale = d3.scale.linear()
                  .domain([0, maxval])
                  .range([0, width]);
  };

  return GraphData;
}());
