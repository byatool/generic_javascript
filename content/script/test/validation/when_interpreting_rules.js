goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenInterpretingRules');


/**
 @export
 */
src.test.validation.validationInterpreter.whenInterpretingRules.describe = function () {
    //Using
    var Current = src.site.validation.validationInterpreter;
    
    //Fields
    
    var NameEmptyError_ = goog.string.getRandomString();
    var UsernameEmptyError_ = goog.string.getRandomString();
    
    var interpreter_;
    var methodList_;
    var rules_;
    var toCheck_;
    
    //Test Hooks
    beforeEach(function() {
        
        var isNotEmpty = function(pair){
            return function(toCheck) {
                var result = pair[1];
                
                if(!goog.string.isEmptySafe(toCheck[pair[0]])){
                    result = '';
                }
                
                return result;
            };
        };
        
        interpreter_ = {};
        
        methodList_ = [
            ['isNotEmpty', isNotEmpty]];
        
        rules_ = [];
        rules_ = [
            ['isNotEmpty',
             ['Username', UsernameEmptyError_],
             ['Name', NameEmptyError_]]];
    });
    
    //Support Methods
    var callTheMethod_ = function() {
        return Current.interpret(rules_, methodList_);
    };
    
    
    //Test Methods
    
    it('should find an empty string', function() {
        toCheck_ = {
            'Name': '',
            'Username': ''
        };
        
        var result = callTheMethod_();
        
        var ending = goog.array.map(result, function(currentItem) {
            return currentItem(toCheck_);
        });
        
        expect(goog.array.every(ending, function(item) {
            return item === UsernameEmptyError_ || item === NameEmptyError_;
        })).toBe(true);
    });
};


describe('When when, it', function() {
    src.test.validation.validationInterpreter.whenInterpretingRules.describe();
});
