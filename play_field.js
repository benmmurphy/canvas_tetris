(function() {
  var PlayField;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  PlayField = (function() {
    function PlayField() {
      this.width = 10;
      this.height = 20;
      this.board = makeMatrix(this.height, this.width, PlayField.FREE_BLOCK);
      this.current_block = null;
      this.bag = new RandomBag(Block.blocks.length);
    }
    PlayField.prototype.start = function() {
      return this.nextBlock();
    };
    PlayField.prototype.isFree = function(row, col) {
      return row >= 0 && row < this.height && col >= 0 && col < this.width && this.board[row][col] === PlayField.FREE_BLOCK;
    };
    PlayField.prototype.nextBlock = function() {
      var nextBlock;
      nextBlock = new Block(this.bag.nextTetromino(), 0, -1, this.width / 2 - Block.ROTATION_SIZE / 2);
      this.current_block = nextBlock;
      return this.updatePreview();
    };
    PlayField.prototype.isFullLine = function(row) {
      var col, _ref;
      for (col = 0, _ref = this.width; 0 <= _ref ? col < _ref : col > _ref; 0 <= _ref ? col++ : col--) {
        if (this.board[row][col] === PlayField.FREE_BLOCK) {
          return false;
        }
      }
      return true;
    };
    PlayField.prototype.iterate = function(cb) {
      var col, row, _ref, _results;
      _results = [];
      for (row = 0, _ref = this.height; 0 <= _ref ? row < _ref : row > _ref; 0 <= _ref ? row++ : row--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (col = 0, _ref2 = this.width; 0 <= _ref2 ? col < _ref2 : col > _ref2; 0 <= _ref2 ? col++ : col--) {
            _results2.push(cb(row, col, this.board[row][col]));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    PlayField.prototype.terminateBlock = function(block) {
      return block.iterate(__bind(function(row, col, value) {
        if (this.isFree(row, col)) {
          return this.board[row][col] = value;
        }
      }, this));
    };
    PlayField.prototype.update = function() {
      if (!(this.current_block != null)) {
        return;
      }
      if (this.tryMoveDown()) {
        return this.updatePreview();
      } else {
        return this.handleLockedBlock();
      }
    };
    PlayField.prototype.handleLockedBlock = function() {
      this.terminateBlock(this.current_block);
      this.current_block = null;
      this.preview_block = null;
      this.handleFullLines();
      if (this.isGameOver()) {
        return console.log("game over");
      } else {
        return this.nextBlock();
      }
    };
    PlayField.prototype.tryMoveDown = function() {
      return this.tryMove(1, 0);
    };
    PlayField.prototype.tryMoveLeft = function() {
      return this.tryMove(0, -1);
    };
    PlayField.prototype.tryMoveRight = function() {
      return this.tryMove(0, 1);
    };
    PlayField.prototype.updatePreview = function() {
      var last_valid, next;
      next = this.current_block;
      last_valid = null;
      while (true) {
        last_valid = next;
        next = last_valid.move(1, 0);
        if (!this.canMoveBlock(next)) {
          break;
        }
      }
      return this.preview_block = last_valid;
    };
    PlayField.prototype.tryMove = function(rowDelta, colDelta) {
      var newPos;
      newPos = this.current_block.move(rowDelta, colDelta);
      if (this.canMoveBlock(newPos)) {
        this.current_block = newPos;
        this.updatePreview();
        return true;
      }
      return false;
    };
    PlayField.prototype.handleFullLines = function() {
      var lines;
      lines = this.findLines();
      return this.removeLines(lines);
    };
    PlayField.prototype.removeLines = function(lines) {
      var i, missing, newBoard, row, _ref;
      if (lines.length === 0) {
        return;
      }
      newBoard = new Array();
      missing = 0;
      for (row = 0, _ref = this.height; 0 <= _ref ? row < _ref : row > _ref; 0 <= _ref ? row++ : row--) {
        if (lines.indexOf(row) < 0) {
          newBoard.push(this.board[row]);
        } else {
          missing++;
        }
      }
      for (i = 0; 0 <= missing ? i < missing : i > missing; 0 <= missing ? i++ : i--) {
        newBoard.unshift(makeRow(this.width, PlayField.FREE_BLOCK));
      }
      return this.board = newBoard;
    };
    PlayField.prototype.findLines = function() {
      var lines, row, _ref;
      lines = [];
      for (row = 0, _ref = this.height; 0 <= _ref ? row < _ref : row > _ref; 0 <= _ref ? row++ : row--) {
        if (this.isFullLine(row)) {
          lines.push(row);
        }
      }
      return lines;
    };
    PlayField.prototype.drop = function() {
      var last_valid, next;
      next = this.current_block;
      last_valid = null;
      while (true) {
        last_valid = next;
        next = last_valid.move(1, 0);
        if (!this.canMoveBlock(next)) {
          break;
        }
      }
      this.current_block = last_valid;
      return this.handleLockedBlock();
    };
    PlayField.prototype.tryRotate = function(delta) {
      var newPos;
      newPos = this.current_block.rotate(delta);
      if (this.canMoveBlock(newPos)) {
        this.current_block = newPos;
        this.updatePreview();
        return true;
      }
      return false;
    };
    PlayField.prototype.tryRotateLeft = function(delta) {
      return this.tryRotate(-1);
    };
    PlayField.prototype.tryRotateRight = function(delta) {
      return this.tryRotate(1);
    };
    PlayField.prototype.canMoveBlock = function(block) {
      var ok;
      ok = true;
      block.iterate(__bind(function(row, col) {
        if (!this.isFree(row, col)) {
          ok = false;
          return false;
        }
      }, this));
      return ok;
    };
    PlayField.prototype.isGameOver = function() {
      var col, _ref;
      for (col = 0, _ref = this.width; 0 <= _ref ? col < _ref : col > _ref; 0 <= _ref ? col++ : col--) {
        if (this.board[0][col] !== PlayField.FREE_BLOCK) {
          return true;
        }
      }
      return false;
    };
    return PlayField;
  })();
  PlayField.FREE_BLOCK = -1;
  window.PlayField = PlayField;
}).call(this);
