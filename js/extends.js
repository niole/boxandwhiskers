module.exports = function(a,b) {
    //extends a with b by
    //putting b on a's prototype
    for (var k in b) {
      if (!a.hasOwnProperty(k)) {
        a.prototype[k] = b[k];
      }
    }
  };
