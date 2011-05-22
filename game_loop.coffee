class GameLoop

    constructor: (@canvas) ->
        keyDown = (event) => this.keyDown(event)
        keyPress = (event) => this.keyPress(event)
        document.addEventListener "keydown", keyDown, true
        document.addEventListener "keypress", keyPress, true
        @playField = new PlayField()
        @playField.start()
        @canvas.renderPlayField(this.playField)
    
        run = () => this.run()
        setTimeout(run, 500)



    keyPress: (e) ->
        if (!@playField.current_block?)
            return
    
        KEY_SPACE   = 32
    
        if (e.keyCode == KEY_SPACE || e.charCode == KEY_SPACE) 
            @playField.drop()
            @canvas.renderPlayField(@playField)

    keyDown : (e) ->
        KEY_DOWN    = 40
        KEY_UP      = 38
        KEY_LEFT    = 37
        KEY_RIGHT   = 39

        if (!@playField.current_block?) 
            return
        
    
        if (e.keyCode == KEY_LEFT) 
            if (@playField.tryMoveLeft()) 
                @canvas.renderPlayField(@playField)
            
        else if (e.keyCode == KEY_RIGHT) 
            if (@playField.tryMoveRight()) 
                @canvas.renderPlayField(@playField)
            
        else if (e.keyCode == KEY_UP) 
            if (@playField.tryRotateLeft())
                @canvas.renderPlayField(@playField)
        
        else if (e.keyCode == KEY_DOWN) 
            if (@playField.tryRotateRight()) 
                @canvas.renderPlayField(@playField)

    run: () ->
        @playField.update()
        @canvas.renderPlayField(@playField)
        run = () => this.run()
        setTimeout(run, 500)

CanvasTetris = () ->
    load = () -> new GameLoop(new CanvasRenderer(document.getElementById('canvas')))
    window.addEventListener "load", load, false

window.CanvasTetris = CanvasTetris

