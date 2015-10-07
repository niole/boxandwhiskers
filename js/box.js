var $ = require('jquery');
var d3 = require('d3');
var calculate = require('./calculations');

module.exports = (function() {
  function Box(data, width) {
    this.data = data;
    this.width = width;
//    this.IQR = width;
  }

  //need IQR so can make boxes and determine outliers
  //need to make whiskers, will do seperately
  //box needs a orientation
  //width
  //data

//  var proto = {
//    getIQR: function() {
//      //need: data, calculations obj
//      //get medians and submedians
//      var median =
//    }
//  };
  return { Box: Box };
}());
