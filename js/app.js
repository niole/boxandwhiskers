var c = require('./calculations');
var $ = require('jquery');
$(document).ready(function() {
  (function() {
//    var c = new calculations();
    var mean = c.mean([1,2,3,4]);
    var med = c.median(0, 3);
    var m = c.median(0, 2);
    console.log(m);
    console.log(med);
  }())
});
