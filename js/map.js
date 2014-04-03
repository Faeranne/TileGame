$(function(){
	window.map = map = new Object;
	map.drawMap = function(context, map, tileSheet){
		for (var i = 0; i<map.tiles.length; i++){
			for (var j = 0; j<map.tiles[i].length; j++){
				context.fillStyle = tileSheet[map.tiles[i][j][1]].color;
				context.fillRect(j*tileHeight,i*tileWidth,tileHeight,tileWidth);
			}
		}
	}

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
