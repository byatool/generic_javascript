goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenCreatingAValidationWrapper');

/**
 @export
 */
src.test.validation.validationInterpreter.whenCreatingAValidationWrapper.describe = function () {
    //Using
    var Current = src.site.validation.validationInterpreter;
    
    
    //Fields
    var interpret_;
    var methodGroup_;
    var methods_;
    var rules_;
    var value_;
    
    
    //Test Hooks
    beforeEach(function() {
        methodGroup_ = [];
        methods_ = [];
        rules_ = [];
        value_ = {};
        interpret_ = function() { return methodGroup_;};
    });
    
    //Support Methods
    var callTheMethod_ = function() {
        return Current.createAValidationWrapper(rules_, methods_, interpret_)(value_);
    };
    
    
    //Test Methods
    
    it('should interpret the rules.', function() {
        var methodWasCalled = false;
        
        interpret_ = function(rules, methods){
            methodWasCalled = rules === rules_ &&
                methods === methods_;
            
            return methodGroup_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should use all validation methods.', function() {
        var methodWasCalled = 0;
        
        var firstValidation = function(value) { methodWasCalled += value === value_;};
        var secondValidation = function(value) { methodWasCalled += value === value_;};
        
        methodGroup_ = [firstValidation, secondValidation];
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(2);
    });
    
    
    it('should not return empty errors.', function() {
        interpret_ = function() {
            return [
                function() {return '';},
                function() { return goog.string.getRandomString();}];
        };
        
        var allAreEmpty = goog.array.every(callTheMethod_(),
                                           function(item) {
                                               return !goog.string.isEmptySafe(item);
                                           });
        
        expect(allAreEmpty).toBe(true);
    });
};


describe('When creating a validation wrapper, it', function() {
    
    src.test.validation.validationInterpreter.whenCreatingAValidationWrapper.describe();
    
});
