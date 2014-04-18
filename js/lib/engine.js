$(function(){
	/** @namespace engine */
	window.engine = engine = new Object;

	engine.tileWidth = 16;
	engine.tileHeight = 16;


	engine.canvas = null;
	engine.context = null;

	/**
	 * Set the engine canvas.
	 * Used by other modules for height/width info.
	 * @memberOf engine
	 * @method setCanvas
	 * @param {string} query - css selector of the canvas to use.
	 * @return engine
	 */
	engine.setCanvas = function(query){
		engine.canvas = document.querySelector(query)
		return engine;
	}

	/**
	 * Retrieve the 2D context of the current canvas
	 * @memberOf engine
	 * @method setContext
	 * @return engine
	 */
	engine.setContext = function(){
		engine.context = engine.canvas.getContext('2d');
		return engine;
	}

	/**
	 * Set the default width and height of all tiles.
	 * @memberOf engine
	 * @method setTiles
	 * @param {number} w - width for all tiles, defaults to 16;
	 * @param {number} h - height for all tiles, defaults to 16;
	 * @return engine
	 */
	engine.setTiles = function(w,h){
		engine.tileWidth = w;
		engine.tileHeight = h;
		return engine;
	}

	/**
	 * Sets default engine loops.
	 * can be substituted for user defined loops;
	 * @memberOf engine
	 * @method setup
	 * @return engine
	 */
	engine.setup = function(){
		loop.add(map.drawMap);
		loop.add(entities.update);
		loop.add(entities.draw);
		loop.add(function(){input.inputLoop()});
		loop.add(gamepad.update);
		return engine;
	}
})
