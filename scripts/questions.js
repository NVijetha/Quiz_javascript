define(["quiz"], function(Quiz) {
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