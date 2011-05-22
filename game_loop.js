(function() {
  var CanvasTetris, GameLoop;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  GameLoop = (function() {
    function GameLoop(canvas) {
      var keyDown, keyPress, run;
      this.canvas = canvas;
      keyDown = __bind(function(event) {
        return this.keyDown(event);
      }, this);
      keyPress = __bind(function(event) {
        return this.keyPress(event);
      }, this);
      document.addEventListener("keydown", keyDown, true);
      document.addEventListener("keypress", keyPress, true);
      this.playField = new PlayField();
      this.playField.start();
      this.canvas.renderPlayField(this.playField);
      run = __bind(function() {
        return this.run();
      }, this);
      setTimeout(run, 500);
    }
    GameLoop.prototype.keyPress = function(e) {
      var KEY_SPACE;
      if (!(this.playField.current_block != null)) {
        return;
      }
      KEY_SPACE = 32;
      if (e.keyCode === KEY_SPACE) {
        this.playField.drop();
        return this.canvas.renderPlayField(this.playField);
      }
    };
    GameLoop.prototype.keyDown = function(e) {
      var KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP;
      KEY_DOWN = 40;
      KEY_UP = 38;
      KEY_LEFT = 37;
      KEY_RIGHT = 39;
      if (!(this.playField.current_block != null)) {
        return;
      }
      if (e.keyCode === KEY_LEFT) {
        if (this.playField.tryMoveLeft()) {
          return this.canvas.renderPlayField(this.playField);
        }
      } else if (e.keyCode === KEY_RIGHT) {
        if (this.playField.tryMoveRight()) {
          return this.canvas.renderPlayField(this.playField);
        }
      } else if (e.keyCode === KEY_UP) {
        if (this.playField.tryRotateLeft()) {
          return this.canvas.renderPlayField(this.playField);
        }
      } else if (e.keyCode === KEY_DOWN) {
        if (this.playField.tryRotateRight()) {
          return this.canvas.renderPlayField(this.playField);
        }
      }
    };
    GameLoop.prototype.run = function() {
      var run;
      this.playField.update();
      this.canvas.renderPlayField(this.playField);
      run = __bind(function() {
        return this.run();
      }, this);
      return setTimeout(run, 500);
    };
    return GameLoop;
  })();
  CanvasTetris = function() {
    return window.addEventListener("load", function() {
      return new GameLoop(new CanvasRenderer(document.getElementById('canvas')));
    });
  };
  window.CanvasTetris = CanvasTetris;
}).call(this);
