$(function(){
	/** @namespace loop */
	window.loop = loop = new Object;

	loop.functions = [];
	
	/**
	 * Description
	 * @memberOf loop
	 * @method add
	 * @param {} fn
	 * @return 
	 */
	loop.add = function(fn){
		loop.functions.push(fn);
	}
	/**
	 * Description
	 * @memberOf loop
	 * @method call
	 * @return 
	 */
	loop.call = function(){
		for(var i = 0; i < loop.functions.length; i++){
			loop.functions[i]();
		}
		window.requestAnimationFrame(loop.call);
	}
})
