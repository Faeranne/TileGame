$(function(){
	/** @namespace keyboard */
	window.keyboard = keyboard = new Object;

	/**
	 * Add action to keyboard key.
	 * @memberOf keyboard
	 * @method attachCommand
	 * @param {int} key - keyCode to attach to
	 * @param {String} callback - action to attach
	 * @return
	 */
	keyboard.attachCommand = function(key,callback){
		window.addEventListener("keydown",
				(function(key,callback){
					return function(e){
						if(e.keyCode == key && input.enabled){
							input.setCommand(callback);
						}
					}
				})(key,callback)
			, false);
		window.addEventListener("keyup",
				(function(key){
					return function(e){
						if(e.keyCode == key){
							input.releaseCommand();
						}
					}
				})(key)
			, false);
		return this;
	}
	/**
	 * Enable keyboard debug.
	 * @memberOf keyboard
	 * @method debug
	 * @return 
	 */
	keyboard.debug = function(){
		window.addEventListener("keydown",function(e){console.log('keycode '+e.keyCode+' pressed')},false);
	}
})
