(function() {
  var CanvasRenderer;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CanvasRenderer = (function() {
    function CanvasRenderer(canvas) {
      this.canvas = canvas;
      this.colors = new Array(7);
      this.image = new Image();
      this.image.src = CanvasRenderer.BLOCKS_SRC;
      this.images = new Array(7);
      this.colors[Block.I] = "red";
      this.colors[Block.J] = "blue";
      this.colors[Block.L] = "orange";
      this.colors[Block.O] = "yellow";
      this.colors[Block.S] = "#FF00FF";
      this.colors[Block.T] = "cyan";
      this.colors[Block.Z] = "green";
      this.images[Block.I] = 0;
      this.images[Block.J] = 80;
      this.images[Block.L] = 60;
      this.images[Block.O] = 20;
      this.images[Block.S] = 100;
      this.images[Block.T] = 120;
      this.images[Block.Z] = 40;
      this.block_size = 20;
      this.width = 200;
      this.height = 400;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    CanvasRenderer.prototype.renderGrid = function(playField) {
      this.renderBorder(playField);
      this.renderGridColumnSeparators(playField);
      return this.renderGridRowSeparators(playField);
    };
    CanvasRenderer.prototype.renderBorder = function(playField) {
      this.ctx.strokeStyle = 'black';
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, this.height);
      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(this.width, 0);
      this.ctx.lineTo(0, 0);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    CanvasRenderer.prototype.renderGridRowSeparators = function(playField) {
      var col, row, _ref, _results;
      this.ctx.strokeStyle = 'lightblue';
      _results = [];
      for (col = 0, _ref = playField.width; 0 <= _ref ? col < _ref : col > _ref; 0 <= _ref ? col++ : col--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (row = 0, _ref2 = playField.height - 1; 0 <= _ref2 ? row < _ref2 : row > _ref2; 0 <= _ref2 ? row++ : row--) {
            this.ctx.beginPath();
            this.ctx.moveTo(col * this.block_size + 1, (row + 1) * this.block_size);
            this.ctx.lineTo((col + 1) * this.block_size - 1, (row + 1) * this.block_size);
            this.ctx.closePath();
            _results2.push(this.ctx.stroke());
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    CanvasRenderer.prototype.renderGridColumnSeparators = function(playField) {
      var col, row, _ref, _results;
      this.ctx.strokeStyle = 'lightblue';
      _results = [];
      for (row = 0, _ref = playField.height; 0 <= _ref ? row < _ref : row > _ref; 0 <= _ref ? row++ : row--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (col = 0, _ref2 = playField.width - 1; 0 <= _ref2 ? col < _ref2 : col > _ref2; 0 <= _ref2 ? col++ : col--) {
            this.ctx.beginPath();
            this.ctx.moveTo((col + 1) * this.block_size, row * this.block_size + 1);
            this.ctx.lineTo((col + 1) * this.block_size, (row + 1) * this.block_size - 1);
            this.ctx.closePath();
            _results2.push(this.ctx.stroke());
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    CanvasRenderer.prototype.drawBlock = function(blockIdx, row, col) {
      if (row < 0) {
        return;
      }
      if (this.image.complete) {
        return this.ctx.drawImage(this.image, this.images[blockIdx], 0, this.block_size, this.block_size, col * this.block_size, row * this.block_size, this.block_size, this.block_size);
      }
    };
    CanvasRenderer.prototype.renderPlayField = function(playField) {
      var end, start;
      this.ctx = this.canvas.getContext('2d');
      start = new Date();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.renderGrid(playField);
      playField.iterate(__bind(function(row, col, value) {
        if (value !== PlayField.FREE_BLOCK) {
          return this.drawBlock(value, row, col);
        }
      }, this));
      if ((playField.current_block != null)) {
        playField.current_block.iterate(__bind(function(row, col, value) {
          return this.drawBlock(value, row, col);
        }, this));
      }
      if ((playField.preview_block != null) && !playField.preview_block.atSamePosition(playField.current_block)) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.2;
        playField.preview_block.iterate(__bind(function(row, col, value) {
          return this.drawBlock(value, row, col);
        }, this));
        this.ctx.restore();
      }
      this.ctx = null;
      return end = new Date();
    };
    return CanvasRenderer;
  })();
  CanvasRenderer.BLOCKS_SRC = 'data:image/png;base64,\
    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\
    AElFTkSuQmCC';
  window.CanvasRenderer = CanvasRenderer;
}).call(this);
