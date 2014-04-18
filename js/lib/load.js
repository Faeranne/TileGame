/**
 * NOTICE: this module is a WIP.
 * @namespace load 
 */
var load = {}

load.inProgress = 0;
load.maps = {}
load.tiles = {}
load.sprites = {}

/**
 * Description
 * @memberOf load
 * @method Map
 * @param {} json
 * @return 
 */
load.Map = function(json){
	//assume all resources have loaded
	map.setMap(json.map);
	entities.clear();
	for(ent in json.entities){
		var entity = json.entities[ent];
		entities.new(entity.sprite,entity.w,entity.h,entity.xOff,entity.yOff,function(entit){
			entit.move(entity.x,entity.y,true);
			entit.setInteraction(entity.interact);
			entit.makeSolid(entity.solid);
		})
	}
	player.create(json.player.sprite);
	player.move(json.player.x,json.player.y,true);
}

/**
 * Description
 * @memberOf load
 * @method getMap
 * @param {} url
 * @return 
 */
load.getMap = function(url){
	load.inProgress++;
	var req = new XMLHttpRequest();
	req.onload = function(){
		var json = JSON.parse(this.responseText);
		load.maps[json.name] = json;
		load.inProgress--;
	}
	req.open("get",url,true);
	req.send();
}

/**
 * Description
 * @memberOf load
 * @method getSprite
 * @param {} url
 * @return 
 */
load.getSprite = function(url){
	load.inProgress++;
	var req = new XMLHttpRequest();
	req.onload = function(){
		var json = JSON.parse(this.responseText);
		load.sprites[json.name] = json;
		load.inProgress--;
	}
	req.open("get",url,true);
	req.send();
}

/**
 * Description
 * @memberOf load
 * @method getTile
 * @param {} url
 * @return 
 */
load.getTile = function(url){
	load.inProgress++;
	var req = new XMLHttpRequest();
	req.onload = function(){
		var json = JSON.parse(this.responseText);
		load.tiles[json.name] = json;
		load.inProgress--;
	}
	req.open("get",url,true);
	req.send();
}

/**
 * Description
 * @memberOf load
 * @method executeLoaded
 * @param {} cb
 * @return 
 */
load.executeLoaded = function(cb){
	var i = setInterval(function(){
		if(load.inProgress){
			return;
		}else{
			clearInterval(i);
			cb()
		}
	});
}
