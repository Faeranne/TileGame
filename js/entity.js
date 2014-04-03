$(function(){
	window.entities = entity = new Object;
	entity.entityList = [];
	entity.new = function(sprite,w,h,x,y) {
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

		temp.draw = function(context){
			context.fillStyle = temp.sprite.color;
			context.fillRect(temp.x,temp.y,temp.width,temp.height);
			return temp;
		}

		temp.offset = function(x,y){
			temp.xOffset = x;
			temp.yOffset = y;
			return temp;
		}

		temp.update = function(){
			temp.x = temp.xMap*tileWidth + temp.xOffset;
			temp.y = temp.yMap*tileHeight + temp.yOffset;
			if(!temp.viewLock){
				temp.x += (mapOffsetX*tileWidth);
				temp.y += (mapOffsetY*tileHeight);
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

		temp.move = function(x,y,static){
			if(!temp.animating){
				if(!map.checkColision(temp.solid,temp.xMap + x, temp.yMap + y)){
					temp.xMap += x;
					temp.yMap += y;
					if(!static){
						temp.animating = true;
						if(x>0){
							temp.xOffset -= tileWidth;
							temp.animationDirection = "+x";
							temp.animationCount = tileWidth;
						}
						if(x<0){
							temp.xOffset += tileWidth;
							temp.animationDirection = "-x";
							temp.animationCount = tileWidth;
						}
						if(y>0){
							temp.yOffset -= tileHeight;
							temp.animationDirection = "+y";
							temp.animationCount = tileHeight;
						}
						if(y<0){
							temp.yOffset += tileHeight;
							temp.animationDirection = "-y";
							temp.animationCount = tileHeight;
						}
					}
				}
			}
			return temp;
		}

		temp.makeSolid = function(solid){
			temp.solid = solid;
			return temp;
		}

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
		entity.draw = function(){
			for(var i = 0; i < entity.entityList.length; i++){
				entity.entityList[i].draw(context);
			}
		}
		entity.update = function(){
			for(var i = 0; i < entity.entityList.length; i++){
				entity.entityList[i].update();
			}
		}

		entity.entityList.push(temp);
		return temp;
	}
});
