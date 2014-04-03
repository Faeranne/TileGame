$(function(){
	Require('js/loop.js');
	Require('js/map.js');
	Require('js/data.js');
	Require('js/entity.js');
	Require('js/input.js');
	Require('js/keyboard.js');
	Require('js/gamepad.js');
	Require('js/do.js');
	Require('js/stats.min.js');

	window.tileWidth = 16;
	window.tileHeight = 16;

	window.mapOffsetX = 0;
	window.mapOffsetY = 0;

	window.canvas = null;
	window.context = null;


	window.init = function(){
		setup();
		setupPlayer();
		setupInput();
		setupStats();
		loop(map1,tileSheet1);
	}

	window.setup = function(){
		canvas = document.getElementById('test');
		context = canvas.getContext('2d');
	}

	window.player = null

	window.setupPlayer = function(){
		player = entities.new(spriteSheet1.character)
		player.xOffset = 3
		player.yOffset = -4
		player.makeSolid(true);
	}

	window.setupInput = function(){
		action.add("left",function(){player.move(-1,0)});
		action.add("right",function(){player.move(1,0)});
		action.add("up",function(){player.move(0,-1)});
		action.add("down",function(){player.move(0,1)});
		keyboard.attachCommand(87,"up")
		keyboard.attachCommand(83,"down")
		keyboard.attachCommand(65,"left")
		keyboard.attachCommand(68,"right")
		gamepad.addButton(7,"left");
		gamepad.addButton(6,"down");
		gamepad.addButton(5,"right");
		gamepad.addButton(4,"up");
		document.querySelector('#controls #left').onclick = action.callback("left")
		document.querySelector('#controls #right').onclick = action.callback("right")
		document.querySelector('#controls #up').onclick = action.callback("up")
		document.querySelector('#controls #down').onclick = action.callback("down")
	}

	window.stats = null;

	window.setupStats = function(){
		stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms

		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '70px';
		stats.domElement.style.top = '175px';
		
		document.body.appendChild( stats.domElement );
	}
});
