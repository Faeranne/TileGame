Require('js/loop.js');
Require('js/map.js');
Require('js/data.js');
Require('js/entity.js');
Require('js/input.js');
Require('js/stats.min.js');

var tileWidth = 16;
var tileHeight = 16;

var mapOffsetX = 0;
var mapOffsetY = 0;

var canvas = null;
var context = null;


var init = function(){
	setup();
	setupPlayer();
	setupInput();
	setupStats();
	loop(map1,tileSheet1);
}

var inputSystem = null

var setup = function(){
	canvas = document.getElementById('test');
	inputSystem = new input()
	context = canvas.getContext('2d');
}

var player = null

var setupPlayer = function(){
	player = new entity(spriteSheet1.character)
	player.xOffset = 3
	player.yOffset = -4
	player.makeSolid(true);
	inputSystem.attachCommand({type:'keydown',key:87},function(){inputSystem.setCommand(function(){player.move(0,-1)})})
	inputSystem.attachCommand({type:'keydown',key:83},function(){inputSystem.setCommand(function(){player.move(0,1)})})
	inputSystem.attachCommand({type:'keydown',key:65},function(){inputSystem.setCommand(function(){player.move(-1,0)})})
	inputSystem.attachCommand({type:'keydown',key:68},function(){inputSystem.setCommand(function(){player.move(1,0)})})
	inputSystem.attachCommand({type:'keyup',key:87},function(){inputSystem.releaseCommand()})
	inputSystem.attachCommand({type:'keyup',key:83},function(){inputSystem.releaseCommand()})
	inputSystem.attachCommand({type:'keyup',key:65},function(){inputSystem.releaseCommand()})
	inputSystem.attachCommand({type:'keyup',key:68},function(){inputSystem.releaseCommand()})
}

var setupInput = function(){
	document.querySelector('#controls #left').onclick = function(){player.move(-1,0)}
	document.querySelector('#controls #right').onclick = function(){player.move(1,0)}
	document.querySelector('#controls #up').onclick = function(){player.move(0,-1)}
	document.querySelector('#controls #down').onclick = function(){player.move(0,1)}
}

var stats = null;

var setupStats = function(){
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '70px';
	stats.domElement.style.top = '175px';
	
	document.body.appendChild( stats.domElement );
}
