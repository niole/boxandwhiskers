var d3 = require('d3');
var $ = require('jquery');
var boxData = require('./boxdata');

module.exports = (function() {
  function Box(data, graphdata, pos) {
    //boxData will sort data if necessary
    this.boxdata = new boxData(data);
    this.xscale = graphdata.xscale;
    this.yscale = graphdata.yscale;
  }

  return Box;
}());
