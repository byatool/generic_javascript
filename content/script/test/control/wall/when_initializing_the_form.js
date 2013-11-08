goog.require('goog.string');
goog.require('src.base.control.wall.form');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.form.whenInitializingTheForm');

/**
 @export
 */
src.test.control.wall.form.whenInitializingTheForm.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var Current_ = src.base.control.wall.form;
  
  

  //Fields
  
  var createAValidationWrapper_;
  var createEmptyDatePickerOptions_;
  var createTheValidationRules_;
  var initializeTheForm_;
  var onSubmit_;
  
  
  
  //Test Hooks
  
  beforeEach(function() {
    
    createAValidationWrapper_ = function(){};
    createEmptyDatePickerOptions_ = function() {};
    createTheValidationRules_ = function() {};
    initializeTheForm_ = function() {};
    onSubmit_ = function() {};
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(onSubmit_, createEmptyDatePickerOptions_,
                               createAValidationWrapper_, createTheValidationRules_,
                               initializeTheForm_);
  };
  
  //Test Methods
  
  it('should create the validation rules.', function() {
    var methodWasCalled = false;

    createTheValidationRules_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should create the validation wrapper.', function() {
    var methodWasCalled = false;
    var rules = {};
    
    createTheValidationRules_ = function(){
      return rules;
    };

    createAValidationWrapper_ = function(ruleSet){
      methodWasCalled = ruleSet === rules;
    };

    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When initializing the form, it', function() {
  src.test.control.wall.form.whenInitializingTheForm.describe();
});


//--namespace="src.test.control.wall.form.whenInitializingTheForm" ^
