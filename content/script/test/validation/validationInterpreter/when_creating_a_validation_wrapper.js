goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenCreatingAValidationWrapper');

/**
 @export
 */
src.test.validation.validationInterpreter.whenCreatingAValidationWrapper.describe = function () {
  
  //Using
  
  var Current_ = src.site.validation.validationInterpreter;
  
  
  //Fields
  
  var filter_;
  var interpret_;
  var isEmptySafe_;
  var map_;
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
    
    filter_ = function(){};
    isEmptySafe_ = function(){};
    map_ = function(){};
    interpret_ = function() { return methodGroup_;};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createAValidationWrapper(rules_, methods_, interpret_,
                                             map_, filter_, isEmptySafe_)(value_);
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
    
    var toCall = function(value) {
      methodWasCalled += value === value_;
    };
    
    map_ = function(methodGroup, toDo){
      methodWasCalled += methodGroup === methodGroup_;
      
      toDo(toCall);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should filter empty errors.', function() {
    var callCount = 0;
    var theError = {};
    var theErrors = {};
    
    map_ = function(){
      return theErrors;
    };
    
    isEmptySafe_ = function(error){
      callCount += error === theError;
    };
    
    filter_ = function(errors, toDo){
      callCount += errors === theErrors;
      toDo(theError);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });
  
  
  it('should only find non empty errors.', function() {
    var methodWasCalled = false;
    
    isEmptySafe_ = function(){
      return false;
    };
    
    filter_ = function(errors, toDo){
      methodWasCalled = toDo();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When creating a validation wrapper, it', function() {
  
  src.test.validation.validationInterpreter.whenCreatingAValidationWrapper.describe();
  
});
