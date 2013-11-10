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
  
  var form_;
   
  var createAValidationWrapper_;
  var createEmptyDatePickerOptions_;
  var createTheSubmitResultHandler_;
  var createTheValidationRules_;
  var getElementByClass_;
  var initializeTheForm_;
  var onSubmit_;
  
  
  
  //Test Hooks
  
  beforeEach(function() {
    form_ = {};
    
    createAValidationWrapper_ = function(){};
    createEmptyDatePickerOptions_ = function() {};
    createTheSubmitResultHandler_ = function(){};
    createTheValidationRules_ = function() {};
    getElementByClass_ = function(){};
    
    initializeTheForm_ = function() {};
    onSubmit_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(form_, onSubmit_, createEmptyDatePickerOptions_,
                               createAValidationWrapper_, createTheValidationRules_,
                               getElementByClass_, initializeTheForm_,
                               createTheSubmitResultHandler_);
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
  
  
  it('should find the textContainer.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EntryTextbox !== undefined &&
         parent === form_ &&
         cssClass === Constant_.EntryTextbox);
    };
    
    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the submit result handler.', function() {
    var methodWasCalled = false;
    var textContainer = {};
    
    getElementByClass_ = function(){
      return textContainer;
    };
    
    createTheSubmitResultHandler_ = function(textContainer, onSubmit, setValue){
      methodWasCalled = textContainer === textContainer &&
        onSubmit === onSubmit &&
        setValue === goog.dom.forms.setValue;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the empty date picker data.', function() {
    var methodWasCalled = false;
    
    createEmptyDatePickerOptions_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should initialize the form.', function() {
    var methodWasCalled = false;
    var createdDatePickerOptions = {};
    var resultHandler = {};
    var wrapper = {};
    
    createEmptyDatePickerOptions_ = function(){
      return createdDatePickerOptions;
    };
    
    createAValidationWrapper_ = function(){
      return wrapper;
    };
    
    createTheSubmitResultHandler_ = function(){
      return resultHandler;
    };
    
    initializeTheForm_ = function(form, datePickerOptions, validationWrapper, empty, submitResultHandler){
      methodWasCalled = form === form_ &&
        datePickerOptions === createdDatePickerOptions &&
        validationWrapper === wrapper &&
        empty === null &&
        submitResultHandler === resultHandler;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When initializing the form, it', function() {
  src.test.control.wall.form.whenInitializingTheForm.describe();
});


//--namespace="src.test.control.wall.form.whenInitializingTheForm" ^
