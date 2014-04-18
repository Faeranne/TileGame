$(function(){
	/** @namespace entities */
	window.entities = entities = new Object;
	entities.entitiesList = [];
	/**
	 * Create a new entity and returns it.
	 * @memberof entities
	 * @method newEntity
	 * @param {string} sprite - name of the sprite from engine.spriteSheet to use for the entity
	 * @param {int} w - width of sprite (needs to be pulled from engine.spriteSheet instead.
	 * @param {int} h - height of sprite (ditto)
	 * @param {int} x - x offset of sprite (again, ditto)
	 * @param {int} y - y offset (man, this really is a problem, isnt it)
	 * @param {function} setup - function to call after creating. usefull for inital postitioning
	 * @return temp
	 */
	entities.newEntity = function(sprite,w,h,x,y,setup) {
		/** @namespace entity */
		var temp = new Object;
		temp.xOffset = 0;
		temp.yOffset = 0;
		temp.x = 0;
		temp.y = 0;
		temp.xMap = x || 0;
		temp.yMap = y || 0;
		temp.width = w || 10;
		temp.height = h || 20;
		temp.lockOffsetX = 0;
		temp.lockOffsetY = 0;
		temp.sprite = sprite
		temp.viewLock = false;
		temp.animationDirection = null;
		temp.animating = false;
		temp.animationCount = 0;

		/**
		 * draw the entity to the engine context.
	 	 * @memberof entity
		 * @method draw
		 * @return temp
		 */
		temp.draw = function(){
			engine.context.fillStyle = temp.sprite.color;
			engine.context.fillRect(temp.x,temp.y,temp.width,temp.height);
			return temp;
		}

		/**
		 * sets a new offset for the sprite (shouldn't be needed once engine.spriteSheet is setup.
	 	 * @memberof entity
		 * @method entity.offset
		 * @param {int} x
		 * @param {int} y
		 * @return temp
		 */
		temp.offset = function(x,y){
			temp.xOffset = x;
			temp.yOffset = y;
			return temp;
		}

		temp.interaction = null

		/**
		 * call the interaction action associated with this entity
	 	 * @memberof entity
		 * @method entity.interact
		 * @return 
		 */
		temp.interact = function(){
			action.do(temp.interaction);
		}

		/**
		 * sets a new interaction for this entity.
	 	 * @memberof entity
		 * @method entity.setInteraction
		 * @param {string} name - name of action to add.
		 * @return 
		 */
		temp.setInteraction = function(name){
			temp.interaction = name
		}

		/**
		 * update actual x,y corrdinates using xMap and yMap, as well as offsets.
		 * also handles animation and movement
	 	 * @memberof entity
		 * @method entity.update
		 * @return temp
		 */
		temp.update = function(){
			temp.x = temp.xMap*engine.tileWidth + temp.xOffset;
			temp.y = temp.yMap*engine.tileHeight + temp.yOffset;
			if(!temp.viewLock){
				temp.x += (map.mapOffsetX*engine.tileWidth);
				temp.y += (map.mapOffsetY*engine.tileHeight);
			}else{
				temp.x += (temp.lockOffsetX);
				temp.y += (temp.lockOffsetY);
			}
			if(temp.animating){
				if(temp.animationCount > 0){
					if(temp.animationDirection == "+x"){
						temp.xOffset++;
					}
					if(temp.animationDirection == "-x"){
						temp.xOffset--;
					}
					if(temp.animationDirection == "+y"){
						temp.yOffset++;
					}
					if(temp.animationDirection == "-y"){
						temp.yOffset--;
					}
					temp.animationCount--;
				}else{
					temp.animationCount = 0;
					temp.animating = false;
				}
			}
			return temp;
		}

		/**
		 * move entity to a new tile
	 	 * @memberof entity
		 * @method entity.move
		 * @param {int} x - x corrdinates to move by
		 * @param {} y - y corrdinates to move by
		 * @param {} static - should we animate this, true = dont, false = do (ya, that's a little wierd.  I should change that)
		 * @return temp
		 */
		temp.move = function(x,y,static){
			if(x>0){
				temp.animationDirection = "+x";
			}
			if(x<0){
				temp.animationDirection = "-x";
			}
			if(y>0){
				temp.animationDirection = "+y";
			}
			if(y<0){
				temp.animationDirection = "-y";
			}
			if(!temp.animating){
				var coliding = entities.checkColision(temp.xMap+x,temp.yMap+y)
				if(coliding != null){
					if(coliding.solid){
						return;
					}
				}
				if(!map.checkColision(temp.solid,temp.xMap + x, temp.yMap + y)){
					entities.updateMap(temp.xMap,temp.yMap,x,y,temp);
					temp.xMap += x;
					temp.yMap += y;
					if(!static){
						temp.animating = true;
						if(x>0){
							temp.xOffset -= engine.tileWidth;
							temp.animationCount = engine.tileWidth;
						}
						if(x<0){
							temp.xOffset += engine.tileWidth;
							temp.animationCount = engine.tileWidth;
						}
						if(y>0){
							temp.yOffset -= engine.tileHeight;
							temp.animationCount = engine.tileHeight;
						}
						if(y<0){
							temp.yOffset += engine.tileHeight;
							temp.animationCount = engine.tileHeight;
						}
					}
				}
			}
			return temp;
		}

		/**
		 * Make the entity a solid, colidable entity.
	 	 * @memberof entity
		 * @method entity.makeSolid
		 * @param {bool} solid - new solid state.
		 * @return temp
		 */
		temp.makeSolid = function(solid){
			temp.solid = solid;
			return temp;
		}

		/**
		 * Fixes entity based on viewport instead of map position.
		 * Usefull for on-screen indicators.
		 * (NOTICE: hasn't been tested or fully implimented. Use at your own risk);
	 	 * @memberof entity
		 * @method entity.lockToViewport
		 * @param {bool} lock - whether or not to set the lock status
		 * @param {int} x - x corrdinate in pixels.
		 * @param {int} y - y corrdinate in pixels.
		 * @return temp
		 */
		temp.lockToViewport = function(lock,x,y){
			temp.viewLock = lock;
			if(x){
				temp.lockOffsetX = x;
			}
			if(y){
				temp.lockOffsetY = y;
			}
			return temp;
		}
		if(typeof setup == "function"){
			setup(temp);
		}
		entities.entitiesList.push(temp);
		return temp;
	}

	/**
	 * Draw all entities.
	 * @memberof entities
	 * @method entities.draw
	 * @return 
	 */
	entities.draw = function(){
		for(var i = 0; i < entities.entitiesList.length; i++){
			entities.entitiesList[i].draw(engine.context);
		}
	}
	/**
	 * Update all entities.
	 * @memberof entities
	 * @method entities.update
	 * @return 
	 */
	entities.update = function(){
		for(var i = 0; i < entities.entitiesList.length; i++){
			entities.entitiesList[i].update();
		}
	}

	entities.map = [];

	/**
	 * Refresh entity map.
	 * @memberof entities
	 * @method entities.updateMap
	 * @param {} oldX
	 * @param {} oldY
	 * @param {} newX
	 * @param {} newY
	 * @param {} entity
	 * @return 
	 */
	entities.updateMap = function(oldX,oldY,newX, newY, entity){
		if(!entities.map){
			entities.map = []
		}
		if(!entities.map[oldX]){
			entities.map[oldX] = [];
		}
		entities.map[oldX][oldY] = null;
		if(!entities.map[newX]){
			entities.map[newX] = [];
		}
		entities.map[newX][newY] = entity;
	}

	/**
	 * Get an entity at x,y or null
	 * @memberof entities
	 * @method entities.getXY
	 * @param {int} x
	 * @param {int} y
	 * @return 
	 */
	entities.getXY = function(x,y){
		if(entities.map[x] && entities.map[x][y]){
			return entities.map[x][y];
		}else{
			return null;
		}
	}

	/**
	 * returns an entity to be colided with.
	 * @memberof entities
	 * @method entities.checkColision
	 * @param {int} x
	 * @param {int} y
	 * @return CallExpression
	 */
	entities.checkColision = function(x,y){
		return entities.getXY(x,y)
	}
});
