$(function(){
	/** @namespace action */
	window.action = action = new Object;
	action.functions = {}
	/**
	 * Add action by name to avalible action list.
	 * @memberOf action
	 * @method add
	 * @param {string} name - name of the action.  used for later reference
	 * @param {function} fn - function to call.
	 * @return 
	 */
	action.add = function(name,fn){
		action.functions[name] = fn;
	}
	/**
	 * Execute an action by name
	 * @memberOf action
	 * @method do
	 * @param {String} name - Name of action to call 
	 * @param {Any} {arguments} - other parameters to pass to the action
	 * @return 
	 */
	action.do = function(){
		var args = Array.prototype.slice.call(arguments);
		var name = args.shift();
		if(!action.functions[name]){
			console.log("No action with name "+name+" found.");
			return;
		}
		action.functions[name].apply(args);
	}
	/**
	 * Gets a callback function that calls the function referenced by name, optionally with additonal parameters.
	 * @memberOf action
	 * @param {String} name - Name of action to call 
	 * @param {Any} {arguments} - other parameters to pass to the action
	 * @method callback
	 * @return Function
	 */
	action.callback = function(){
		var args = Array.prototype.slice.call(arguments);
		var name = args.shift();
		if(!action.functions[name]){
			console.log("No action with name "+name+" found.");
			return function(){
				alert("No Such action "+name);
			}
		}
		return (function(name,args){
			return function(){
				action.functions[name].apply(args);
			}
		})(name,args);
	}
});
