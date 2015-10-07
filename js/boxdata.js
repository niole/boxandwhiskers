var $ = require('jquery');
var d3 = require('d3');
var calculate = require('./calculations');

module.exports = (function() {
  function BoxData(data, width) {
    this.data = data;
    this.width = width;
    this.IQR = this.getIQR(data);
    this.getEndVals(this.IQR, data, this.q1Val, this.q3Val);
  }

  //need IQR so can make boxes and determine outliers
  //need to make whiskers, will do seperately
  //box needs a orientation
  //width
  //data
  //
  BoxData.prototype.indxToVal = function(idxs, data) {
    return idxs.map(function(i) {
      return data[i];
    });
  };

  BoxData.prototype.getEndVals = function(IQR, data, q1Val, q3Val) {
    var maxDist = IQR*(1.5);
    this.outliers = [];
    for (var i=0; i < data.length; i++) {
      if (data[i] < q1Val-maxDist) {
        this.outliers.push(i);
      } else {
        this.startIndWhisker = i;
        break;
      }
    }
    for (var j=data.length-1; j >= 0; j--) {
      if (data[j] > q3Val+maxDist) {
        this.outliers.push(j);
      } else {
        this.endIndWhisker = j;
        break;
      }
    }
  };

  BoxData.prototype.getIQR = function(data) {
    this.q2 = calculate.median(0, data.length-1);
    this.q1 = calculate.median(0, this.q2[0]);
    this.q3 = calculate.median(this.q2[this.q2.length-1], data.length-1);
    this.q2Val = calculate.sum(this.indxToVal(this.q2, data))/(this.q2.length);
    this.q1Val = calculate.sum(this.indxToVal(this.q1, data))/(this.q1.length);
    this.q3Val = calculate.sum(this.indxToVal(this.q3, data))/(this.q3.length);
    return Math.abs(this.q3Val-this.q1Val);
  };

  return BoxData;
}());
