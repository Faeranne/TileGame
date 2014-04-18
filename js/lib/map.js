$(function(){
	/** @namespace map */
	window.map = map = new Object;
	/**
	 * Description
	 * @memberOf map
	 * @method drawMap
	 * @return 
	 */
	map.drawMap = function(){
		var workingMap = map.currentMap;
		var tileSheet = workingMap.tileSheet;
		for (var i = 0; i<workingMap.tiles.length; i++){
			for (var j = 0; j<workingMap.tiles[i].length; j++){
				engine.context.fillStyle = tileSheet[workingMap.tiles[i][j][1]].color;
				engine.context.fillRect(j*engine.tileHeight,i*engine.tileWidth,engine.tileHeight,engine.tileWidth);
			}
		}
	}

	map.currentMap = null;

	map.mapOffsetX = 0;
	map.mapOffsetY = 0;

	/**
	 * Description
	 * @memberOf map
	 * @method setMap
	 * @param {} newMap
	 * @return 
	 */
	map.setMap = function(newMap){
		map.currentMap = newMap
	}

	/**
	 * Description
	 * @memberOf map
	 * @method checkColision
	 * @param {} solid
	 * @param {} x
	 * @param {} y
	 * @return 
	 */
	map.checkColision = function(solid, x, y){
		if(!solid){
			return false;
		}
		if(typeof(map1.tiles[y]) == "undefined"){
			return true;
		}
		if(typeof(map1.tiles[y][x]) == "undefined"){
			return true;
		}
		if(map1.tiles[y][x][0].solid){
			return true;
		}
	}
});
