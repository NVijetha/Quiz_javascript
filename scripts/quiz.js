define(function(){
	"use strict";
	
	function quiz(name){
	this.name = name;
	this.modules = [];
	}

	quiz.prototype.add = function(name1){
		this.modules.push(
			Object.create(
				module.prototype, 
				{
					name:{value:name1, writable:true, configurable:true},
					rightanswers:{value:"0", writable:true, configurable:true}, 
					problems:{value:[], writable:true, configurable:true}
				}
			)
		);
	}

	quiz.prototype.get = function(module){
		return this.modules[module];
	} 

	quiz.prototype.total = function(){
		return this.modules.length;
	}
	
		
	//*********************

	function module(name){
		this.name = name;
		this.rightanswers = 0;
		this.problems = [];
	}

	module.prototype.add = function(question,answers){
		this.problems.push(new questions(arguments));
	}

	module.prototype.get = function(question){
		return this.problems[question];
	}

	module.prototype.total = function(){
		return this.problems.length;
	}

	//**************************

	function questions(args){
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var i;
		this.choice = [];
		this.selection = -1;
		this.question = args[0];
		this.answers = chars.indexOf(args[1]);
		for(i = 2; i < args.length; i++){
			this.choice.push(args[i]);
		}
	}

	questions.prototype.totalchoice = function(){
		return this.choice.length;
	}

	questions.prototype.getchoice = function(choice){
		return this.choice[choice];
	}
	
	return quiz;
});