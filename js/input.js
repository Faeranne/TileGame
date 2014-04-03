var inputLoop = function(){};

var input = function(){
	this.attachCommand = function(input,callback){
		window.addEventListener(input.type,
				(function(key,callback){
					return function(e){
						if(e.keyCode == key){
							callback();
						}
					}
				})(input.key,callback)
			, false);
		return this;
	}
	this.setCommand = function(callback){
		inputLoop = callback;
		return this;
	}

	this.releaseCommand = function(){
		inputLoop = function(){}
		return this;
	}
}
