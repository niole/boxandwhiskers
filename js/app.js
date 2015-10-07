var b = require('./box');
var graphdata = require('./graphdata');
var $ = require('jquery');
$(document).ready(function() {
  (function() {
    var gd = new graphdata(100, 100, 4, 4, true);
    var box = new b([1,2,3,4], gd);
  }())
});
