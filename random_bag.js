(function() {
  var RandomBag;
  RandomBag = (function() {
    function RandomBag(size) {
      this.size = size;
      this.init();
    }
    RandomBag.prototype.init = function() {
      var _i, _ref, _results;
      return this.bag = shuffle((function() {
        _results = [];
        for (var _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this, arguments));
    };
    RandomBag.prototype.nextTetromino = function() {
      var result;
      result = this.bag.shift();
      if (this.bag.length === 0) {
        this.init();
      }
      return result;
    };
    return RandomBag;
  })();
  window.RandomBag = RandomBag;
}).call(this);
