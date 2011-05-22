class PlayField
	constructor: () ->
		@width = 10
		@height = 20
		@board = makeMatrix(@height, @width, PlayField.FREE_BLOCK)
		@current_block = null
		@bag = new RandomBag(Block.blocks.length)
	
	start: () ->
		this.nextBlock()

	isFree: (row, col) ->
		row >= 0 && row < @height && col >= 0 && col < @width && @board[row][col] == PlayField.FREE_BLOCK
	
	nextBlock: () ->
		nextBlock = new Block(@bag.nextTetromino(), 0, -1, @width / 2 - Block.ROTATION_SIZE / 2)
		@current_block = nextBlock
		this.updatePreview()
		
	isFullLine: (row) ->
		for col in [0...@width]
			if @board[row][col] == PlayField.FREE_BLOCK
				return false
		
		return true

	iterate: (cb) ->
		for row in [0...@height]
			for col in [0...@width]
				cb(row, col, @board[row][col])
	
	terminateBlock: (block) ->
		block.iterate (row, col, value) =>
			if this.isFree(row, col)
				@board[row][col] = value
	

	update: () ->
		if !@current_block?
			return
		
		if this.tryMoveDown()
			this.updatePreview()
		else
			this.handleLockedBlock()

	handleLockedBlock: () ->
		this.terminateBlock(@current_block)
		@current_block = null
		@preview_block = null
		this.handleFullLines()
		if (this.isGameOver())
			console.log("game over")
		else
			this.nextBlock()
	
	tryMoveDown: () ->
		this.tryMove(1, 0)
		
	tryMoveLeft: () ->
		this.tryMove(0, -1)
		
	tryMoveRight: () ->
		this.tryMove(0, 1)
	
	updatePreview: () ->
		next = @current_block
		last_valid = null
		loop
			last_valid = next
			next = last_valid.move(1, 0)
			break if !this.canMoveBlock(next)
		
		@preview_block = last_valid

	tryMove: (rowDelta, colDelta) ->
		newPos = @current_block.move(rowDelta, colDelta)
		if (this.canMoveBlock(newPos))
			@current_block = newPos
			this.updatePreview()
			return true
		
		return false

	handleFullLines: () -> 
		lines = this.findLines()
		this.removeLines(lines)

	removeLines: (lines) ->
		if (lines.length == 0) 
			return
		newBoard = new Array()
		missing = 0
		for row in [0...@height]
			if (lines.indexOf(row) < 0) 
				newBoard.push(@board[row])
			else
				missing++
		for i in [0...missing]
			newBoard.unshift(makeRow(@width, PlayField.FREE_BLOCK))
		@board = newBoard

	findLines: () ->
		lines = []
		for row in [0...@height]
			if (this.isFullLine(row))
				lines.push(row)
				
		return lines

	drop: () ->
		next = @current_block
		last_valid = null
		loop 
			last_valid = next
			next = last_valid.move(1, 0)
			break if !this.canMoveBlock(next)
	
		@current_block = last_valid
		this.handleLockedBlock()

	tryRotate: (delta) ->
		newPos = @current_block.rotate(delta)
		if (this.canMoveBlock(newPos))
			@current_block = newPos
			this.updatePreview()
			return true
		return false

	tryRotateLeft: (delta) -> 
		return this.tryRotate(-1)

	tryRotateRight: (delta) ->
		return this.tryRotate(1)

	canMoveBlock : (block) ->
		ok = true
		block.iterate (row, col) =>
			if (!this.isFree(row, col)) 
				ok = false
				return false
			
		return ok

	isGameOver : () ->
		for col in [0...@width]
			if (@board[0][col] != PlayField.FREE_BLOCK) 
				return true
		return false

PlayField.FREE_BLOCK = -1
window.PlayField = PlayField