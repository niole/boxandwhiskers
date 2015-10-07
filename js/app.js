var calculations = require('./calculations');
var $ = require('jquery');
$(document).ready(function() {
  (function() {
    var c = new calculations([6,7,8,93,2]);
    var mean = c.mean();
  }())
});
