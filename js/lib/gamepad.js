$(function(){
	/** @namespace gamepad */
	window.gamepad = gamepad = new Object;

	gamepad.actions = [];

	window.addEventListener("gamepadconnected", function(e){
		gamepad.pad = e.gamepad
		gamepad.connected = true;
		console.log("bound to controller id: "+e.gamepad.id);
	})

	/**
	 * Run gamepad loop
	 * @memberOf gamepad
	 * @method update
	 * @return 
	 */
	gamepad.update = function(){
		if(!gamepad.connected && input.enabled){
			return false;
		}
		for(var i = 0; i < gamepad.pad.buttons.length; i++){
			if(gamepad.pad.buttons[i].pressed){
				if(gamepad.debugging){
					console.log("button "+i+" pressed");
				}
				if(gamepad.actions[i]){
					action.do(gamepad.actions[i]);
				}
			}
		}
	}

	/**
	 * Add an action to a button
	 * @memberOf gamepad
	 * @method addButton
	 * @param {} button
	 * @param {} action
	 * @return 
	 */
	gamepad.addButton = function(button,action){
		gamepad.actions[button] = action;
	}

	/**
	 * enable gamepad debuging
	 * @memberOf gamepad
	 * @method debug
	 * @return 
	 */
	gamepad.debug = function(){
		gamepad.debugging = true;
	}

});
