//main.js
require(["jquery", "scripts/questions.js"	],
	function($, quizObj){
		document.getElementById("quizName").innerHTML = quizObj.name;
		var totalModules = quizObj.total();
		var tdString = "";
		var i;
		for(i = 0; i < totalModules; i++){
			currentModule = quizObj.get(i);
			tdString = tdString + '<td>';
			tdString = tdString + '<a href="#" class="quiz_module" data-quiz_module_id="' + i + '">'+currentModule.name+'</a>';
			tdString = tdString + '</td>&nbsp;&nbsp;';
		}
		document.getElementById("moduleList").innerHTML = tdString;
	
//		
		function display(module){
			getModule = quizObj.get(module);
			var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var sHeader = document.getElementById("heading");
			var headerText = getModule.name + ": Answer the following questions";
			sHeader.childNodes[0].nodeValue = headerText;
			
			var questionsDiv = document.getElementById("quizBody");
			var resultButton = document.getElementById("resButton");
			
			if(questionsDiv.childNodes){
				for(var i=0; i < questionsDiv.childNodes.length; i++){
					questionsDiv.removeChild(questionsDiv.childNodes[i]);
				}
			}
			
			var totalSets = getModule.total();
			var questionList = document.createElement('OL');
			
			for(var i=0; i< totalSets; i++){
				var currentQuestion = getModule.get(i);
				var listElement = document.createElement('LI');
				var breakpoint = document.createElement('BR');
				var listQuestion = document.createTextNode(currentQuestion.question);
				var choicelist = document.createElement('UL');
				var uniqueid = uniquename(5);
				var totalchoices = currentQuestion.totalchoice();
				for(var x=0; x<totalchoices; x++){
					var choiceitem = document.createElement('LI') ;
					var listradio = document.createElement('INPUT');
					listradio.setAttribute('type','radio');
					listradio.setAttribute('name',uniqueid);
					listradio.setAttribute('value',uniqueid);
					listradio.setAttribute('id','radio_button');
					listradio.setAttribute('data_module',module);
					listradio.setAttribute('data_question',i);
					listradio.setAttribute('data_option',x);
					var choiceitemchar = document.createTextNode(chars.charAt(x) + ". ");
					var choiceitemtext = document.createTextNode(currentQuestion.getchoice(x));
					choiceitem.appendChild(listradio);
					choiceitem.appendChild(choiceitemchar);
					choiceitem.appendChild(choiceitemtext);
					choicelist.appendChild(choiceitem);
				}
				
				listElement.appendChild(listQuestion);
				listElement.appendChild(choicelist);
				questionList.appendChild(listElement);
			}
			questionsDiv.appendChild(questionList);
			
			$(document).ready(function(){
				$(document).on("click", "input.submit_button", function(){
					results(module);
					return false;
				});
			});
		}

		function uniquename(length){
			name = "";
			var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			for(x=0;x<length;x++)
			{
				i = Math.floor(Math.random() * 52);
				name += chars.charAt(i);
			}
			return name;
		}

		function selectedOption(module,question,selectedOpt){
			var getModule = quizObj.get(module);
			var getQuestion = getModule.get(question);
			getQuestion.selection = selectedOpt;
		}

		function results(module){
			var getModule = quizObj.get(module);
			var numberOfWrAnswers = new Array();
			var trueFalse = false;
			getModule.rightanswers = 0;
			for(var i=0; i<getModule.total(); i++){
				var getQuestion = getModule.get(i);
				if(getQuestion.selection == -1)
				{
					trueFalse = true;
					alert('Please Answer all the questions');
					break;
				}
				if(getQuestion.selection == getQuestion.answers)
				{
					getModule.rightanswers++ ;
				}else{
					numberOfWrAnswers.push(i + 1);
				}
			}
			if(!trueFalse){
				var percent = Math.round((getModule.rightanswers/getModule.total())*100);
				if(percent==100){
					alert('Congrats...!!! \n\n Your score is:'+percent+'%');
				}else{
					alert('Your score is:'+ percent + '%');
				}
				
				if(numberOfWrAnswers.length>0){
					var wrongQuestions = "";
					for(var i=0; i<numberOfWrAnswers.length; i++){
						wrongQuestions += 'Q'+numberOfWrAnswers[i].toString()+',';
					}
					alert('Following are the Wrong answered questions \n '+wrongQuestions);
				}
			}
		}		
//	
		
		$(document).ready(function(){
			// handling click on quiz module
			$(document).on("click", "a.quiz_module", function(){
				var quiz_module_id = $(this).data("quiz_module_id");
				display(quiz_module_id);
				return false;
			});
			
			$(document).on("click","input:radio[id=radio_button]",function(){
				var module = $(this).attr('data_module');
				var question = $(this).attr('data_question');
				var option = $(this).attr('data_option');
				selectedOption(module,question,option);
			});
		});
	}
);