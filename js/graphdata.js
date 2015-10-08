var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

module.exports = (function() {
  function GraphData(height, width, data, vertical) {
    var nplots = data.length;
    this.setExtremes(data);

    if (vertical) {
      this.setyscale(this.min, this.max, height);
      this.setxscale(0, nplots, width);
    } else {
      this.setyscale(0, nplots, height);
      this.setxscale(this.min, this.max, width);
    }
  }

  GraphData.prototype.setExtremes = function(data) {
    var allData = _.flatten(_.map(data, function(d) {
                    return d.data;
                  }));

    this.min = _.min(allData);
    this.max = _.max(allData);
  };

  GraphData.prototype.setyscale = function(min, max, height) {
    var minval = 0;
    if (min < 0) {
      minval = min;
    }

    this.yscale = d3.scale.linear()
                  .domain([minval, max])
                  .range([height, 0]);
  };

  GraphData.prototype.setxscale = function(min, max, width) {
    var minval = 0;
    if (min < 0) {
      minval = min;
    }

    this.xscale = d3.scale.linear()
                  .domain([minval, max])
                  .range([0, width]);
  };

  return GraphData;
}());
