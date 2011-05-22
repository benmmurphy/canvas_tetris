class RandomBag

	constructor: (@size) ->
		this.init()

	init: () ->
		@bag = shuffle([0...@size])
	
	nextTetromino: () ->
		result = @bag.shift()
		if (@bag.length == 0) 
    		this.init()
  		
  		return result

window.RandomBag = RandomBag