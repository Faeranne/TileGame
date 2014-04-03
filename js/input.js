$(function(){
	window.input = input = new Object;
	input.setCommand = function(callback){
		this.inputLoop = action.callback(callback);
		return this;
	}

	input.releaseCommand = function(){
		this.inputLoop = function(){}
		return this;
	}
	input.inputLoop = function(){};
});
