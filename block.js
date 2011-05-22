(function() {
  var Block;
  Block = (function() {
    function Block(block_idx, block_rotation, row, col) {
      this.block_idx = block_idx;
      this.block_rotation = block_rotation;
      this.row = row;
      this.col = col;
    }
    Block.prototype.move = function(rowDelta, colDelta) {
      return new Block(this.block_idx, this.block_rotation, this.row + rowDelta, this.col + colDelta);
    };
    Block.prototype.atSamePosition = function(other_block) {
      return this.row === other_block.row && this.col === other_block.col;
    };
    Block.prototype.rotate = function(delta) {
      var next;
      next = this.block_rotation + delta;
      if (next < 0) {
        next = Block.ROTATIONS - 1;
      } else {
        next = next % Block.ROTATIONS;
      }
      return new Block(this.block_idx, next, this.row, this.col);
    };
    Block.prototype.iterate = function(cb) {
      var blocks, col, row, _ref, _ref2, _results;
      blocks = 0;
      _results = [];
      for (row = 0, _ref = Block.ROTATION_SIZE; 0 <= _ref ? row < _ref : row > _ref; 0 <= _ref ? row++ : row--) {
        for (col = 0, _ref2 = Block.ROTATION_SIZE; 0 <= _ref2 ? col < _ref2 : col > _ref2; 0 <= _ref2 ? col++ : col--) {
          if (Block.blocks[this.block_idx][this.block_rotation][row * Block.ROTATION_SIZE + col] === 1) {
            blocks = blocks + 1;
            if (false === cb(this.row + row, this.col + col, this.block_idx)) {
              return;
            }
          }
        }
      }
      return _results;
    };
    return Block;
  })();
  Block.ROTATION_SIZE = 4;
  Block.ROTATIONS = 4;
  Block.I = 0;
  Block.J = 1;
  Block.L = 2;
  Block.O = 3;
  Block.S = 4;
  Block.T = 5;
  Block.Z = 6;
  Block.blocks = [[[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]], [[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]], [[0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]], [[0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]], [[0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]], [[1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]]];
  window.Block = Block;
}).call(this);
