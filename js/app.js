var Graph = require('./graph');
var $ = require('jquery');

$(document).ready(function() {
  (function() {
    //data --> [{index: number, label: string, data: array}]
    var height = 500;
    var width = 500;
    var data = [
      {index: 0, label: "q1", data: [6,8,5,3,7,22,6]},
      {index: 1, label: "q0", data: [6,8,5,3,7,22,0,3,2,1,3,7,6]}
    ];
    var vertical = true;
    var graph = new Graph(height, width, data, vertical);
  }())
});
