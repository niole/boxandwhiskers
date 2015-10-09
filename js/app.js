var Graph = require('./graph');
var $ = require('jquery');

$(document).ready(function() {
  (function() {
    //data --> [{index: number, label: string, data: array}]
    var height = 500;
    var width = 500;
    var data = [
      {index: 0, label: "q1", data: [1,2,3,4,5,66,77,3,6,8,2,3,8,43,73,88]},
      {index: 1, label: "q0", data: [45,62,73,74,75,88,99,55,55,55,55,55,55,55,55]}
    ];
    var vertical = true;
    var graph = new Graph(height, width, data, vertical);
  }())
});
