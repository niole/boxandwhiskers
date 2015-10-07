"use strict";

module.exports =  {
    isNumber: function(n) {
      if (isNaN(n) || n === null || n === 'undefined') {
        throw Error('an element in your array is not a number');
      }
    },
    mean: function(data) {
      var self = this;
      return (data.reduce(function(a,b) {
        self.isNumber(a);
        self.isNumber(b);
        return a+b;
      } ))/(data.length);
    },
    median: function(start, end) {
      var length = end-start+1;
      var m = length/2;
      if (length%2 === 0) {
        return [start+m-1,start+m];
      }
      if (length%2 === 1) {
        return [start+Math.floor(m)];
      }
    }
};
