$(function(){
	window.keyboard = keyboard = new Object;
	keyboard.attachCommand = function(key,callback){
		window.addEventListener("keydown",
				(function(key,callback){
					return function(e){
						if(e.keyCode == key){
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
})
