//quiz.js
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