$(function(){
	window.loop = function(){
		stats.begin();
		map.drawMap(context,map1,tileSheet1);
		entities.update();
		entities.draw();
		input.inputLoop();
		gamepad.update();
		window.requestAnimationFrame(loop);
		stats.end();
	}
})
