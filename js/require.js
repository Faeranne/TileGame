/*
 * Include a script from a url
 *
 * @url: source of script to require
 * returns: script object associated to loaded script
 */
var Require = function(url){
	var script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script);
	return script;
}

/*
 * Include an array of scripts
 *
 * @scripts[]: array of urls to include
 * returns: an array of script objects
 */

var RequireAll = function(scripts){
	var returns = [];
	for(var i = 0; i<scripts.length; i++){
		returns.push(Require(scripts[i]));
	}
	return returns;
}
