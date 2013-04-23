//Specs file
define(['scripts/questions.js'], function(quizModule){
    describe('A small test for our project', function() {
        "use strict";
        var quizName = quizModule.name;
        it('should have jQuery available as $', function() {
            expect('$').not.toBe(true);
        });
        it('questions test', function(){
            expect(quizModule).not.toBe(null);
        });
        it('should return true if name are same', function(){
            expect(quizName).toEqual('General Quiz');
        });
    });
});