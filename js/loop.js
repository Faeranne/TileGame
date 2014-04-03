var loop = function(){
	stats.begin();
	drawMap(context,map1,tileSheet1);
	for(var i = 0; i < entityList.length; i++){
		entityList[i].draw(context);
	}
	for(var i = 0; i < entityList.length; i++){
		entityList[i].update();
	}
	inputLoop();
	window.requestAnimationFrame(loop);
	stats.end();
}
