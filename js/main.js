/*
 * Sample TileEngine initalization
 */
$(function(){
	//use require.js to add dev files.
	//Should cat files together before shipping
	Require('js/lib/loop.js');
	Require('js/lib/map.js');
	Require('js/lib/entity.js');
	Require('js/lib/input.js');
	Require('js/lib/keyboard.js');
	Require('js/lib/gamepad.js');
	Require('js/lib/do.js');
	Require('js/lib/player.js');
	Require('js/lib/engine.js');

	Require('js/stats.min.js');
	Require('js/data.js');

	window.init = function(){
		setupStats();
		setup();
		setupActions();
		setupPlayer();
		setupEntities();
		setupInput();
		map.setMap(map1);
		loop.call();
	}

	window.setup = function(){
		engine.setCanvas('#test');
		engine.setContext();
		loop.add(stats.begin);
		engine.setup();
		loop.add(stats.end);
	}

	window.setupPlayer = function(){
		player.create(spriteSheet1.character);
	}

	window.setupEntities = function(){
		entities.newEntity(spriteSheet1.sign,16,16,0,0,function(entity){
			entity.move(3,1,true);
			entity.setInteraction("imasign");
			entity.makeSolid(true);
		});
	}

	window.setupActions = function(){
		action.add("left",function(){player.move(-1,0)});
		action.add("right",function(){player.move(1,0)});
		action.add("up",function(){player.move(0,-1)});
		action.add("down",function(){player.move(0,1)});
		action.add("interact",function(){player.interact()});
		action.add("imasign", function(){input.disable(); alert("I am a sign"); input.enable();});
	}

	window.setupInput = function(){
		keyboard.attachCommand(87,"up")
		keyboard.attachCommand(83,"down")
		keyboard.attachCommand(65,"left")
		keyboard.attachCommand(68,"right")
		keyboard.attachCommand(69,"interact")
		gamepad.addButton(7,"left");
		gamepad.addButton(6,"down");
		gamepad.addButton(5,"right");
		gamepad.addButton(4,"up");
		gamepad.addButton(13,"interact");
		document.querySelector('#controls #left').onclick = action.callback("left")
		document.querySelector('#controls #right').onclick = action.callback("right")
		document.querySelector('#controls #up').onclick = action.callback("up")
		document.querySelector('#controls #down').onclick = action.callback("down")
		document.querySelector('#controls #interact').onclick = action.callback("interact")
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
