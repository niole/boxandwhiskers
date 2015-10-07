module.exports = (function() {
  function Calculate(data) {
    this.data = data;
  }

  var proto = {
    mean: function() {
      return (this.data.reduce(function(a,b) { return a+b; } ))/(this.data.length);
    }
  };

  Calculate.prototype = Object.create(proto);

  return Calculate;
}());
