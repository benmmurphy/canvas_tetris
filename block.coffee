class Block
	constructor: (@block_idx, @block_rotation, @row, @col) ->
		
	
	move: (rowDelta, colDelta) ->
		return new Block(@block_idx, @block_rotation, @row + rowDelta, @col + colDelta)

	atSamePosition: (other_block) ->
		return @row == other_block.row && @col == other_block.col

	rotate: (delta) ->
		next = @block_rotation + delta
		if (next < 0) 
			next = Block.ROTATIONS - 1
		else 
			next = next % Block.ROTATIONS
		
		return new Block(@block_idx, next, @row, @col)

	iterate: (cb) ->
		blocks = 0
		for row in [0...Block.ROTATION_SIZE]
			for col in [0...Block.ROTATION_SIZE]
				if (Block.blocks[@block_idx][@block_rotation][row * Block.ROTATION_SIZE + col] == 1)
					blocks = blocks + 1
					if (false == cb(@row + row, @col + col, @block_idx)) 
						return
							
Block.ROTATION_SIZE = 4
Block.ROTATIONS = 4

Block.I = 0
Block.J = 1
Block.L = 2
Block.O = 3
Block.S = 4
Block.T = 5
Block.Z = 6

Block.blocks = [
          [[0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0],
           [0, 0, 0, 0,
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0]],
          [[1, 0, 0, 0,
            1, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 1, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0],
           [0, 0, 0, 0,
            1, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            0, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0]],
          [[0, 0, 1, 0,
            1, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0],
           [0, 0, 0, 0,
            1, 1, 1, 0,
            1, 0, 0, 0,
            0, 0, 0, 0],
           [1, 1, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0,
            0, 0, 0, 0]],
          [[0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0]],
          [[0, 1, 1, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0],
           [0, 0, 0, 0,
            0, 1, 1, 0,
            1, 1, 0, 0,
            0, 0, 0, 0],
           [1, 0, 0, 0,
            1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0]],
          [[0, 1, 0, 0,
            1, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0],
           [0, 0, 0, 0,
            1, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0]],
          [[1, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
           [0, 0, 1, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0],
           [0, 0, 0, 0,
            1, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0],
           [0, 1, 0, 0,
            1, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, 0, 0]]
]

window.Block = Block
