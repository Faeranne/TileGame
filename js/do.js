$(function(){
	window.action = action = new Object;
	action.functions = {}
	action.add = function(name,fn){
		action.functions[name] = fn;
	}
	action.do = function(){
		var args = Array.prototype.slice.call(arguments);
		var name = args.shift();
		action.functions[name].apply(args);
	}
	action.callback = function(){
		var args = Array.prototype.slice.call(arguments);
		var name = args.shift();
		return (function(name,args){
			return function(){
				action.functions[name].apply(args);
			}
		})(name,args);
	}
});
