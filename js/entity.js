var entity = function(sprite,w,h,x,y) {
	this.xOffset = 0;
	this.yOffset = 0;
	this.x = 0;
	this.y = 0;
	this.xMap = x || 0;
	this.yMap = y || 0;
	this.width = w || 10;
	this.height = h || 20;
	this.lockOffsetX = 0;
	this.lockOffsetY = 0;
	this.sprite = sprite
	this.viewLock = false;
	this.animationDirection = null;
	this.animating = false;
	this.animationCount = 0;

	this.draw = function(context){
		context.fillStyle = this.sprite.color;
		context.fillRect(this.x,this.y,this.width,this.height);
		return this;
	}

	this.offset = function(x,y){
		this.xOffset = x;
		this.yOffset = y;
		return this;
	}

	this.update = function(){
		this.x = this.xMap*tileWidth + this.xOffset;
		this.y = this.yMap*tileHeight + this.yOffset;
		if(!this.viewLock){
			this.x += (mapOffsetX*tileWidth);
			this.y += (mapOffsetY*tileHeight);
		}else{
			this.x += (this.lockOffsetX);
			this.y += (this.lockOffsetY);
		}
		if(this.animating){
			if(this.animationCount > 0){
				if(this.animationDirection == "+x"){
					this.xOffset++;
				}
				if(this.animationDirection == "-x"){
					this.xOffset--;
				}
				if(this.animationDirection == "+y"){
					this.yOffset++;
				}
				if(this.animationDirection == "-y"){
					this.yOffset--;
				}
				this.animationCount--;
			}else{
				this.animationCount = 0;
				this.animating = false;
			}
		}
		return this;
	}

	this.move = function(x,y,static){
		if(!this.animating){
			if(!checkColision(this.solid,this.xMap + x, this.yMap + y)){
				this.xMap += x;
				this.yMap += y;
				if(!static){
					this.animating = true;
					if(x>0){
						this.xOffset -= tileWidth;
						this.animationDirection = "+x";
						this.animationCount = tileWidth;
					}
					if(x<0){
						this.xOffset += tileWidth;
						this.animationDirection = "-x";
						this.animationCount = tileWidth;
					}
					if(y>0){
						this.yOffset -= tileHeight;
						this.animationDirection = "+y";
						this.animationCount = tileHeight;
					}
					if(y<0){
						this.yOffset += tileHeight;
						this.animationDirection = "-y";
						this.animationCount = tileHeight;
					}
				}
			}
		}
		return this;
	}

	this.makeSolid = function(solid){
		this.solid = solid;
		return this;
	}

	this.lockToViewport = function(lock,x,y){
		this.viewLock = lock;
		if(x){
			this.lockOffsetX = x;
		}
		if(y){
			this.lockOffsetY = y;
		}
		return this;
	}

	entityList.push(this);
	return this;
}

var entityList = []
