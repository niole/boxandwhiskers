var $ = require('jquery');
var d3 = require('d3');
var calculate = require('./calculations');

module.exports = (function() {
  function Box(data, width) {
    this.data = data;
    this.width = width;
    this.IQR = this.getIQR();
  }

  //need IQR so can make boxes and determine outliers
  //need to make whiskers, will do seperately
  //box needs a orientation
  //width
  //data
  //
  Box.prototype.indxToVal = function(idxs, data) {
    return idxs.map(function(i) {
      return data[i];
    });
  };

  Box.prototype.getIQR = function() {
    this.median = calculate.median(0, this.data.length-1);
    this.q1 = calculate.median(0, this.median[0]);
    this.q3 = calculate.median(this.median[this.median.length-1], this.data.length-1);
    return Math.abs(calculate.sum(this.indxToVal(this.q1, this.data))/(this.q1.length)
                 - calculate.sum(this.indxToVal(this.q3, this.data))/(this.q3.length));
  };

  return Box;
}());
