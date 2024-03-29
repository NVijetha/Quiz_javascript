//main.js
require(["jquery", "scripts/questions.js"], function($, quizModule) {
    "use strict";
	/*global document: false */
	/*jslint devel: true */
    $('#quizName')[0].innerHTML = quizModule.name;
    var totalModules = quizModule.total(),
        tdString = "",
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        i,
        j,
        k,
        l,
        m,
        x,
        name,
        currentModule,
        getModule,
        getQuestion,
        sHeader,
        headerText,
        questionsDiv,
        resultButton,
        totalSets,
        questionList,
        currentQuestion,
        listElement,
        breakpoint,
        listQuestion,
        choicelist,
        uniqueid,
        totalchoices,
        choiceitem,
        listradio,
        choiceitemchar,
        choiceitemtext,
        numberOfWrAnswers = [],
        trueFalse = false,
        percent,
        wrongQuestions,
        quiz_module_id,
        answeredModule,
        answeredQuestion,
        optionSelected;

    for (i = 0; i < totalModules; i += 1) {
        currentModule = quizModule.get(i);
        tdString += '<a href="#" class="quiz_module" data-quiz_module_id="' + i + '">' + currentModule.name + '</a>';
    }
    $('#moduleList')[0].innerHTML = tdString;

    function uniquename(length) {
        name = "";
        for (x = 0; x < length; x += 1) {
            k = Math.floor(Math.random() * 52);
            name += chars.charAt(k);
        }
        return name;
    }

    function selectedOption(module, question, selectedOpt) {
        getModule = quizModule.get(module);
        getQuestion = getModule.get(question);
        getQuestion.selection = selectedOpt;
    }
//
    function display(module) {
        getModule = quizModule.get(module);
        sHeader = $('#heading')[0];
        headerText = getModule.name + ": Answer the following questions";
        sHeader.childNodes[0].nodeValue = headerText;
        questionsDiv = $('#quizBody')[0];
        resultButton = $('#resButton')[0];
        if (questionsDiv.childNodes) {
            for (i = 0; i < questionsDiv.childNodes.length; i += 1) {
                questionsDiv.removeChild(questionsDiv.childNodes[i]);
            }
        }
        totalSets = getModule.total();
        questionList = document.createElement('OL');

        for (j = 0; j < totalSets; j += 1) {
            currentQuestion = getModule.get(j);
            listElement = document.createElement('LI');
            breakpoint = document.createElement('BR');
            listQuestion = document.createTextNode(currentQuestion.question);
            choicelist = document.createElement('UL');
            uniqueid = uniquename(5);
            totalchoices = currentQuestion.totalchoice();

            for (x = 0; x < totalchoices; x += 1) {
                choiceitem = document.createElement('LI');
                listradio = document.createElement('INPUT');
                listradio.setAttribute('type', 'radio');
                listradio.setAttribute('name', uniqueid);
                listradio.setAttribute('value', uniqueid);
                listradio.setAttribute('id', 'radio_button');
                listradio.setAttribute('data_module', module);
                listradio.setAttribute('data_question', j);
                listradio.setAttribute('data_option', x);
                choiceitemchar = document.createTextNode(chars.charAt(x) + ". ");
                choiceitemtext = document.createTextNode(currentQuestion.getchoice(x));
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

        $(document).ready(function() {
            $(document).on("click", "input.submit_button", function() {
                results(module);
                return false;
            });
        });
    }

    function results(module) {
        getModule = quizModule.get(module);
        getModule.rightanswers = 0;

        for (l = 0; l < getModule.total(); l += 1) {
            getQuestion = getModule.get(l);
            if (getQuestion.selection === -1) {
                trueFalse = true;
                alert('Please Answer all the questions');
                break;
            }

            if (+getQuestion.selection === getQuestion.answers) {
                getModule.rightanswers += 1;
            } else {
                numberOfWrAnswers.push(l + 1);
            }
        }

        if (!trueFalse) {
            percent = Math.round((getModule.rightanswers / getModule.total()) * 100);
            if (percent === 100) {
                alert('Congrats...!!! \n\n Your score is:' + percent + '%');
            } else {
                alert('Your score is:' + percent + '%');
            }

            if (numberOfWrAnswers.length > 0) {
                wrongQuestions = "";
                for (l = 0; l < numberOfWrAnswers.length; l += 1) {
                    wrongQuestions += 'Q' + numberOfWrAnswers[l].toString() + ',';
                }
                alert('Following are the Wrong answered questions \n ' + wrongQuestions);
            }
        }
    }
//
    $(document).ready(function() {
        // handling click on quiz module
        $(document).on("click", "a.quiz_module", function() {
            quiz_module_id = $(this).data("quiz_module_id");
            display(quiz_module_id);
            return false;
        });
        $(document).on("click", "input:radio[id=radio_button]", function() {
            answeredModule = $(this).attr('data_module');
            answeredQuestion = $(this).attr('data_question');
            optionSelected = $(this).attr('data_option');
            selectedOption(answeredModule, answeredQuestion, optionSelected);
        });
    });
});
define(['scripts/quiz.js'], function(Quiz) {
    "use strict";
    var quizModule = new Quiz("General Quiz"),
        noOfModules = 0,
        eachModule;
    quizModule.add('English');
    noOfModules = quizModule.total();
    eachModule = quizModule.modules[noOfModules - 1];
    eachModule.add("Identify Noun", 'a', "Tiger", "Done", "He", "She");
    eachModule.add("Who is the author of Geetanjali?", 'b', "Bipin Chandrabose", "Tagore", "Ravi Sharma", "Chetan Baghat");
    quizModule.add('Science');
    noOfModules = quizModule.total();
    eachModule = quizModule.modules[noOfModules - 1];
    eachModule.add("Who invented Telephone?", 'c', "Ruther Ford", "Michel Jackson", "Graham Bell", "Newton");
    eachModule.add("Who invented Microscope?", 'd', "Albert Einstein", "Ramanujam", "Lincon", "Sacharias Jansen");
    return quizModule;
});
define(function() {
    "use strict";
    function Quiz(name) {
        this.name = name;
        this.modules = [];
    }
    function Module(name) {
        this.name = name;
        this.rightanswers = 0;
        this.problems = [];
    }
    function Questions(args) {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            i;
        this.choice = [];
        this.selection = -1;
        this.question = args[0];
        this.answers = chars.indexOf(args[1]);
        for (i = 2; i < args.length; i += 1) {
            this.choice.push(args[i]);
        }
    }
    Quiz.prototype.add = function(name) {
        this.modules.push(new Module(name));
    };
    Quiz.prototype.get = function(moduleIndx) {
        return this.modules[moduleIndx];
    };
    Quiz.prototype.total = function() {
        return this.modules.length;
    };
    Module.prototype.add = function(question, answers) {
        this.problems.push(new Questions(arguments));
    };
    Module.prototype.get = function(question) {
        return this.problems[question];
    };
    Module.prototype.total = function() {
        return this.problems.length;
    };
    Questions.prototype.totalchoice = function() {
        return this.choice.length;
    };
    Questions.prototype.getchoice = function(choice) {
        return this.choice[choice];
    };
    return Quiz;
});