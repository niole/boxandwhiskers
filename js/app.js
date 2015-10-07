var b = require('./boxdata');
var $ = require('jquery');
$(document).ready(function() {
  (function() {
    var box = new b([1,2,3,4]);
    var Box = new b([1,2,3]);
  }())
});
