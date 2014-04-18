$(function(){
	/** @namespace player */
	window.player = player = new Object;
	player.entity = null;
	/**
	 * Description
	 * @memberOf player
	 * @method create
	 * @param {} sprite
	 * @return 
	 */
	player.create = function(sprite){
		player.entity = entities.newEntity(sprite)
		player.entity.xOffset = 3
		player.entity.yOffset = -4
		player.entity.makeSolid(true);
	}
	/**
	 * Description
	 * @memberOf player
	 * @method move
	 * @param {} x
	 * @param {} y
	 * @return 
	 */
	player.move = function(x,y){
		player.entity.move(x,y);
	}
	/**
	 * Description
	 * @memberOf player
	 * @method interact
	 * @return 
	 */
	player.interact = function(){
		var x = 0
		var y = 0
		if(player.entity.animationDirection == "+x"){
			x = 1;
		}
		if(player.entity.animationDirection == "-x"){
			x = -1;
		}
		if(player.entity.animationDirection == "+y"){
			y = 1;
		}
		if(player.entity.animationDirection == "-y"){
			y = -1;
		}
		var toCheck = entities.getXY(player.entity.xMap+x,player.entity.yMap+y)
		if(toCheck != null){
			toCheck.interact();
		}
	}
});
