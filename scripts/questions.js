//var quizLoad = (function(){
define(["quiz"],function(quiz){
	"use strict";
	var quizObj = Object.create(quiz.prototype,{
		name:{value:"General Quiz",writable:true, configurable:true}, 
		modules:{value:[],writable:true, configurable:true}
	});
	
	var noModules = 0;
	var moduleObj;
	
	quizObj.add('English');
	noModules = quizObj.total();
	moduleObj = quizObj.modules[noModules-1];
	moduleObj.add("Identify Noun",'a',"Tiger","Done","He","She");
	moduleObj.add("Who is the author of Geetanjali?",'b',"Bipin Chandrabose","Tagore","Ravi Sharma","Chetan Baghat");
	
	quizObj.add('Science');
	noModules = quizObj.total();
	moduleObj = quizObj.modules[noModules-1];
	moduleObj.add("Who invented Telephone?",'c',"Ruther Ford","Michel Jackson","Graham Bell","Newton");
	moduleObj.add("Who invented Microscope?",'d',"Albert Einstein","Ramanujam","Lincon","Sacharias Jansen");	
	
	return quizObj;
});
//}());