$(function(){
	/** @namespace input */
	window.input = input = new Object;

	/** 
	 * Determines wether or not input should be accepted for general use.
	 * @memberOf input
	 * @var enabled
	 */
	input.enabled = true;

	/**
	 * set the keyboard loop command.  (FIX: Limits to one keypress at a time)
	 * @memberOf input
	 * @method setCommand
	 * @param {string} callback - action to call in the loop
	 * @return ThisExpression
	 */
	input.setCommand = function(callback){
		this.inputLoop = action.callback(callback);
		return this;
	}

	/**
	 * removes the current keyboard loop command.
	 * @memberOf input
	 * @method releaseCommand
	 * @return ThisExpression
	 */
	input.releaseCommand = function(){
		this.inputLoop = function(){}
		return this;
	}

	/**
	 * enables input.
	 * @memberOf input
	 * @method enable
	 * @return 
	 */
	input.enable = function(){
		input.enabled = true;
	}

	/**
	 * disables input.
	 * @memberOf input
	 * @method disable
	 * @return 
	 */
	input.disable = function(){
		input.enabled = false;
	}

	/**
	 * calls the keyboard input loop.
	 * @memberOf input
	 * @method inputLoop
	 * @return 
	 */
	input.inputLoop = function(){
	};

});
