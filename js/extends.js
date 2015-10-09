module.exports = function(a,b) {
    //extends a with each object in array b by
    //putting each of b on a's prototype
    b.forEach(function(o) {
      for (var k in o) {
        if (!a.hasOwnProperty(k)) {
          a.prototype[k] = o[k];
        }
      }
    });
  };
