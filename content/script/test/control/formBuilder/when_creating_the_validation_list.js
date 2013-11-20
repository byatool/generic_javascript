goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.validation');
goog.require('src.site.validation.validationInterpreter.constant');


goog.provide('src.test.control.formBuilder.validation.whenCreatingTheValidation');

/**
 @export
 */
src.test.control.formBuilder.validation.whenCreatingTheValidation.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var Current_ = src.base.control.formBuilder.validation;
  
  
  //Fields

  var createAValidationWrapper_;
  var createValidationItem_;
  var formSpec_;
  var map_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    formSpec_ = {};

    createAValidationWrapper_ = function(){};
    createValidationItem_ = function(){};
    map_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createValidation(formSpec_, createValidationItem_, map_,
                                     createAValidationWrapper_);
  };
  
  
  //Test Methods
   
  it('should create a validation item for each spec item.', function() {
    var methodWasCalled = 0;
    var item = {};
    
    createValidationItem_ = function(currentItem, forEach, insert){
      methodWasCalled += currentItem === item &&
        forEach === goog.array.forEach &&
        insert === goog.array.insert;
    };
    
    map_ = function(list, toDo){
      methodWasCalled += list == formSpec_;
      
      toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create the validation handler.', function() {
    var methodWasCalled = false;
    var validation = {};
    
    map_ = function(){
      return validation;
    };
    
    createAValidationWrapper_ = function(rules){
      methodWasCalled = rules === validation;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should return the validation wrapper.', function() {
    var validation = {};
    
    createAValidationWrapper_ = function(){
      return validation;
    };
    
    expect(callTheMethod_()).toBe(validation);
  });
   
};

describe('When creating the validation, it', function() {
  src.test.control.formBuilder.validation.whenCreatingTheValidation.describe();
});
