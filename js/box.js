var d3 = require('d3');
var $ = require('jquery');
var boxData = require('./boxdata');

module.exports = (function() {
  function Box(data, graphdata) {
    this.boxdata = new boxData(data);
    this.graphdata = graphdata;
  }
  return Box;
}());
