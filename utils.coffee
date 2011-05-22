
shuffle = (array) ->
	top = array.length
	tmp = null
	current = null
	if(top) 
		while(--top) 
        	current = Math.floor(Math.random() * (top + 1))
        	tmp = array[current]
        	array[current] = array[top]
        	array[top] = tmp

    return array

makeMatrix = (rows, cols, val) ->
	arr = new Array(rows)
	for i in [0...rows]
		arr[i] = makeRow(cols, val)
	
	return arr

makeRow = (size, val)  ->
	arr = new Array(size)
	for i in [0...size]
		arr[i] = val
	
	return arr

window.shuffle = shuffle
window.makeRow = makeRow
window.makeMatrix = makeMatrix




	






