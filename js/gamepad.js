$(function(){
	window.gamepad = gamepad = new Object;

	gamepad.actions = [];

	window.addEventListener("gamepadconnected", function(e){
		gamepad.pad = e.gamepad
		gamepad.connected = true;
		console.log("bound to controller id: "+e.gamepad.id);
	})

	gamepad.update = function(){
		if(!gamepad.connected){
			return false;
		}
		for(var i = 0; i < gamepad.pad.buttons.length; i++){
			if(gamepad.pad.buttons[i].pressed){
				if(gamepad.actions[i]){
					action.do(gamepad.actions[i]);
				}
			}
		}
	}

	gamepad.addButton = function(button,action){
		gamepad.actions[button] = action;
	}

});
