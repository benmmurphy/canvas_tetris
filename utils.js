(function() {
  var makeMatrix, makeRow, shuffle;
  shuffle = function(array) {
    var current, tmp, top;
    top = array.length;
    tmp = null;
    current = null;
    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }
    return array;
  };
  makeMatrix = function(rows, cols, val) {
    var arr, i;
    arr = new Array(rows);
    for (i = 0; 0 <= rows ? i < rows : i > rows; 0 <= rows ? i++ : i--) {
      arr[i] = makeRow(cols, val);
    }
    return arr;
  };
  makeRow = function(size, val) {
    var arr, i;
    arr = new Array(size);
    for (i = 0; 0 <= size ? i < size : i > size; 0 <= size ? i++ : i--) {
      arr[i] = val;
    }
    return arr;
  };
  window.shuffle = shuffle;
  window.makeRow = makeRow;
  window.makeMatrix = makeMatrix;
}).call(this);
